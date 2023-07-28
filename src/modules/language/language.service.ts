import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Redis } from 'ioredis';
import { Model } from 'mongoose';
import { FeaturesEnum } from 'src/common/enum/features.enum';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { LanguageDto } from 'src/modules/language/dto/language.dto';
import { LanguageLibs } from 'src/modules/language/models/language_libs.model';

@Injectable()
export class LanguageService {
  constructor(
    @Inject(FeaturesRepo) private readonly featuresRepo: FeaturesRepo,
    @Inject(PROVIDER_TYPES.RedisClient) private readonly redisClient: Redis,
    @InjectModel('language_libs')
    private readonly languageLibsModel: Model<LanguageLibs>,
  ) {}

  async viewLanguage(guildId: string): Promise<LanguageDto> {
    const feature = await this.featuresRepo.findSingleFeature(
      guildId,
      FeaturesEnum.LANGUAGE,
    );

    return feature;
  }

  async updateLanguage(guildId: string, languageUpdateDto: LanguageDto) {
    await this.featuresRepo.updateSingleFeature(
      guildId,
      FeaturesEnum.LANGUAGE,
      languageUpdateDto,
    );

    //Update Feature Flag Cache
    await Promise.all([
      this.redisClient.set(
        `guild-${guildId}:feature:strongLanguage`,
        languageUpdateDto.strongLanguage.isActive.toString(),
      ),

      this.redisClient.set(
        `guild-${guildId}:feature:strongLanguageConfig`,
        JSON.stringify(languageUpdateDto.strongLanguage),
      ),

      this.redisClient.set(
        `guild-${guildId}:feature:languageFilter`,
        languageUpdateDto.languageFilter.isActive.toString(),
      ),
    ]);

    //Cache Language Filter config
    languageUpdateDto.languageFilter.languageFilterConfig.map(async (e) => {
      this.redisClient.set(
        `guild-${guildId}:feature:languageFilterConfig`,
        JSON.stringify(languageUpdateDto.languageFilter.languageFilterConfig),
        'EX',
        300,
      );

      if (e.isActive) {
        const dataLib = await this.languageLibsModel.findOne({
          _id: e.dataLibId,
          guildId,
        });

        //Cache Data Libs
        if (dataLib) {
          this.redisClient.set(
            `guild-${guildId}:dataLib-${e.dataLibId}`,
            JSON.stringify(dataLib.data),
            'EX',
            300,
          );
        }
      }
    });
  }
}
