import { Inject, Injectable } from '@nestjs/common';
import { FeaturesEnum } from 'src/common/enum/features.enum';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { GreetDto } from 'src/modules/greet/dto/Greet.dto';

@Injectable()
export class GreetService {
  constructor(
    @Inject(FeaturesRepo) private readonly featuresRepo: FeaturesRepo,
  ) {}

  async viewGreet(guildId: string): Promise<GreetDto> {
    const feature = await this.featuresRepo.findSingleFeature(
      guildId,
      FeaturesEnum.GREET,
    );

    return feature;
  }

  async updateGreet(guildId: string, greetUpdateDto: GreetDto) {
    await this.featuresRepo.updateSingleFeature(
      guildId,
      FeaturesEnum.GREET,
      greetUpdateDto,
    );
  }
}
