import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeaturesEnum } from 'src/common/enum/features.enum';
import { Features } from 'src/modules/features/model/features.model';

@Injectable()
export class FeaturesRepo {
  constructor(
    @InjectModel(Features.name) private readonly featuresModel: Model<Features>,
  ) {}

  async findByGuildId(guildId: string) {
    return this.featuresModel.findOne({ guildId });
  }

  async findSingleFeature(guildId: string, feature: string) {
    const singleFeature = await this.featuresModel.findOne(
      { guildId },
      { [feature]: 1 },
    );

    return singleFeature[feature];
  }

  async updateSingleFeature(
    guildId: string,
    feature: FeaturesEnum,
    payload: any,
  ) {
    await this.featuresModel.updateOne(
      { guildId },
      {
        $set: { [feature]: payload },
      },
    );
  }
}
