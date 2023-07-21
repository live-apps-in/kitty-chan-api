import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { FeaturesEnum } from 'src/common/enum/features.enum';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { LanguageDto } from 'src/modules/language/dto/language.dto';

@Injectable()
export class LanguageService {
  constructor(
    @Inject(FeaturesRepo) private readonly featuresRepo: FeaturesRepo,
    @Inject(PROVIDER_TYPES.RedisClient) private readonly redisClient: Redis,
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
        `guild-${guildId}:feature:strongLanguageEn`,
        languageUpdateDto.strongLanguage.isActive.toString(),
      ),

      this.redisClient.set(
        `guild-${guildId}:feature:languageFilter`,
        languageUpdateDto.languageFilter.isActive.toString(),
      ),
    ]);
  }
}
