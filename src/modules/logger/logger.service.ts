import { Inject, Injectable } from "@nestjs/common";
import { FeaturesEnum } from "src/common/enum/features.enum";
import { FeaturesRepo } from "src/modules/features/repository/features.repo";
import { LoggerDto } from "src/modules/logger/dto/Logger.dto";

@Injectable()
export class LoggerService {
  constructor(
    @Inject(FeaturesRepo) private readonly featuresRepo: FeaturesRepo,
  ) {}

  async viewLogger(guildId: string): Promise<LoggerDto> {
    const feature = await this.featuresRepo.findSingleFeature(
      guildId,
      FeaturesEnum.LOGGER,
    );

    return feature;
  }

  async updateLogger(guildId: string, memberUpdateDto: LoggerDto) {
    await this.featuresRepo.updateSingleFeature(
      guildId,
      FeaturesEnum.LOGGER,
      memberUpdateDto,
    );
  }
}