import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Redis } from 'ioredis';
import { Model } from 'mongoose';
import { FeaturesEnum } from 'src/common/enum/features.enum';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { LanguageDto } from 'src/modules/language/dto/language.dto';
import { StrongLanguage } from 'src/modules/language/dto/strong_language.dto';
import { LanguageLibs } from 'src/modules/language/models/language_libs.model';
import { Client as EsClient } from '@elastic/elasticsearch';
import { LanguageFilter } from 'src/modules/language/dto/language_filter.dto';
import { v4 } from 'uuid';
import { EsService } from 'src/common/service/es.service';

@Injectable()
export class LanguageService {
  constructor(
    @Inject(FeaturesRepo) private readonly featuresRepo: FeaturesRepo,
    @Inject(PROVIDER_TYPES.RedisClient) private readonly redisClient: Redis,
    @Inject(PROVIDER_TYPES.EsClient)
    private readonly esClient: EsClient,
    @Inject(EsService)
    private readonly esService: EsService,
    @InjectModel('language_libs')
    private readonly languageLibsModel: Model<LanguageLibs>,
  ) {}

  /**View all language features config */
  async viewLanguage(guildId: string): Promise<LanguageDto> {
    const feature = await this.featuresRepo.findSingleFeature(
      guildId,
      FeaturesEnum.LANGUAGE,
    );

    return feature;
  }

  /**Update Strong language config  */
  async updateStrongLanguage(
    guildId: string,
    strongLanguageDto: StrongLanguage,
  ) {
    const languageFeature = await this.featuresRepo.findSingleFeature(
      guildId,
      FeaturesEnum.LANGUAGE,
    );
    languageFeature.strongLanguage = strongLanguageDto;

    await this.featuresRepo.updateSingleFeature(
      guildId,
      FeaturesEnum.LANGUAGE,
      languageFeature,
    );

    //Update Feature Flag Cache
    await Promise.all([
      this.redisClient.set(
        `guild-${guildId}:feature:strongLanguage`,
        strongLanguageDto.isActive.toString(),
      ),

      //Cache Strong Language config
      this.redisClient.set(
        `guild-${guildId}:feature:strongLanguageConfig`,
        JSON.stringify(strongLanguageDto),
        'EX',
        300,
      ),
    ]);

    //Store Language Lib data to Elastic search
    for (const languageConfig of strongLanguageDto.languageConfig) {
      await this.esClient.deleteByQuery({
        index: 'language-lib',
        body: { query: { match: { refId: languageConfig.whitelistLib } } },
      });

      const languageLib = await this.languageLibsModel
        .findOne({
          _id: languageConfig.whitelistLib,
          guildId,
        })
        .lean();

      //Persist language data to Elastic search
      if (languageLib) {
        for (const data of languageLib.data) {
          const languageData = {
            name: languageLib.name,
            system: languageLib.system,
            guildId: languageLib.guildId,
            type: languageLib.type,
            refId: languageLib._id,
            data,
          };

          await this.esService.createOrUpdateIndex('language-lib', v4(), {
            ...languageData,
          });
        }
      }
    }
  }

  async updateLanguageFilter(
    guildId: string,
    languageFilterDto: LanguageFilter,
  ) {
    const languageFeature = await this.featuresRepo.findSingleFeature(
      guildId,
      FeaturesEnum.LANGUAGE,
    );
    languageFeature.languageFilter = languageFilterDto;

    await this.featuresRepo.updateSingleFeature(
      guildId,
      FeaturesEnum.LANGUAGE,
      languageFeature,
    );

    //Update Feature Flag Cache
    await Promise.all([
      this.redisClient.set(
        `guild-${guildId}:feature:languageFilter`,
        languageFilterDto.isActive.toString(),
      ),

      //Cache Strong Language config
      this.redisClient.set(
        `guild-${guildId}:feature:languageFilterConfig`,
        JSON.stringify(languageFilterDto),
        'EX',
        300,
      ),
    ]);

    for (const languageConfig of languageFilterDto.languageFilterConfig) {
      await this.esClient.deleteByQuery({
        index: 'language-lib',
        body: {
          query: { match: { refId: languageConfig.languageLibId } },
        },
      });

      const languageLib = await this.languageLibsModel
        .findOne({
          _id: languageConfig.languageLibId,
          guildId,
        })
        .lean();

      //Persist language data to Elastic search
      if (languageLib) {
        for (const data of languageLib.data) {
          const languageData = {
            name: languageLib.name,
            system: languageLib.system,
            guildId: languageLib.guildId,
            type: languageLib.type,
            refId: languageLib._id,
            data,
          };

          await this.esService.createOrUpdateIndex('language-lib', v4(), {
            ...languageData,
          });
        }
      }
    }
  }
}
