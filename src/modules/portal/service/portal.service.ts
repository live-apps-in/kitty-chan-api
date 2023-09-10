import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { FeaturesEnum } from 'src/common/enum/features.enum';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { PortalDto } from 'src/modules/portal/dto/portal.dto';

@Injectable()
export class PortalService {
  constructor(
    @Inject(FeaturesRepo) private readonly featureRepo: FeaturesRepo,
    @Inject(PROVIDER_TYPES.RedisClient) private readonly redisClient: Redis,
  ) {}

  /**Get Portal Config */
  async getPortalConfig(guildId: string) {
    return this.featureRepo.findSingleFeature(guildId, FeaturesEnum.PORTAL);
  }

  /**Update Portal Config */
  async updatePortalConfig(guildId: string, portalDto: PortalDto) {
    await this.featureRepo.updateSingleFeature(
      guildId,
      FeaturesEnum.PORTAL,
      portalDto,
    );

    const portalConfig = await this.featureRepo.findSingleFeature(
      guildId,
      FeaturesEnum.PORTAL,
    );

    //Update Redis cache
    await this.redisClient.set(
      `guild-${guildId}:feature:portal`,
      JSON.stringify(portalConfig),
    );

    return portalDto;
  }
}
