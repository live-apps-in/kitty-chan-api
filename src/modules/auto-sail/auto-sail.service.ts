import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from 'src/common/service/redis.service';
import { AutoSailCreateDto } from 'src/modules/auto-sail/dto/auto-sail.dto';
import { AutoSail } from 'src/modules/auto-sail/model/auto-sail.model';

@Injectable()
export class AutoSailService {
  constructor(
    @InjectModel('auto_sail') private readonly autoSailModel: Model<AutoSail>,
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {}

  async get(guildId: string) {
    return this.autoSailModel.find({ guildId });
  }

  async create(
    guildId: string,
    userId: string,
    autoSailCreateDto: AutoSailCreateDto,
  ) {
    autoSailCreateDto.guildId = guildId;
    autoSailCreateDto.userId = userId;

    const getAutoSailByName = await this.autoSailModel.countDocuments({
      name: autoSailCreateDto.name,
    });

    if (getAutoSailByName) {
      throw new ConflictException('AutoSail Configuration already exists!');
    }

    const saveAuoSail = await new this.autoSailModel(autoSailCreateDto).save();

    await this.updateConfigInRedis(guildId);

    return saveAuoSail;
  }

  async update(
    guildId: string,
    userId: string,
    autoSailId: string,
    autoSailCreateDto: AutoSailCreateDto,
  ) {
    autoSailCreateDto.guildId = guildId;
    autoSailCreateDto.userId = userId;

    const checkAutoSailDuplication = await this.autoSailModel.countDocuments({
      name: autoSailCreateDto.name,
      _id: { $ne: autoSailId },
    });

    if (checkAutoSailDuplication) {
      throw new ConflictException('AutoSail Configuration already exists!');
    }

    await this.autoSailModel.updateOne(
      { _id: autoSailId },
      {
        $set: autoSailCreateDto,
      },
    );
    await this.updateConfigInRedis(guildId);
  }

  private async updateConfigInRedis(guildId: string) {
    const guildAutoSailConfig = await this.autoSailModel
      .find({
        guildId,
        isActive: true,
      })
      .lean()
      .then((data) => data.map((e) => e?.config));

    if (guildAutoSailConfig.length) {
      const autoSailConfigKey = `guild-${guildId}-features-autoSailConfig`;

      await this.redisService.setWithExpiry(
        autoSailConfigKey,
        JSON.stringify(guildAutoSailConfig),
        30,
      );
    }
  }
}
