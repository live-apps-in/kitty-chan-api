import { Inject, Injectable } from '@nestjs/common';
import { FeaturesEnum } from 'src/common/enum/features.enum';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { PortalDto } from 'src/modules/portal/dto/portal.dto';

@Injectable()
export class PortalService {
  constructor(
    @Inject(FeaturesRepo) private readonly featureRepo: FeaturesRepo,
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
  }
}
