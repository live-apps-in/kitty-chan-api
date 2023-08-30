import { Inject, Injectable } from '@nestjs/common';
import { FeaturesEnum } from 'src/common/enum/features.enum';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';

@Injectable()
export class PortalService {
  constructor(
    @Inject(FeaturesRepo) private readonly featureRepo: FeaturesRepo,
  ) {}
  async getPortalConfig(guildId: string) {
    return this.featureRepo.findSingleFeature(guildId, FeaturesEnum.PORTAL);
  }
}
