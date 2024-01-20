import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RedisService } from 'src/common/service/redis.service';
import { AutoSailCreateDto } from 'src/modules/auto-sail/dto/auto-sail.dto';
import { AutoSail } from 'src/modules/auto-sail/model/auto-sail.model';
import { CronService } from 'src/modules/cron/cron.service';
import { CronConfigDto } from 'src/modules/cron/dto/cron-config.dto';
import { CronModuleTypes } from 'src/modules/cron/enum/cron-modules.enum';

@Injectable()
export class AutoSailService {
  constructor(
    @InjectModel('auto_sail') private readonly autoSailModel: Model<AutoSail>,
    @Inject(RedisService) private readonly redisService: RedisService,
    @Inject(CronService) private readonly cronService: CronService,
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

    const createAutoSail = await new this.autoSailModel(
      autoSailCreateDto,
    ).save();

    await this.updateConfigInRedis(guildId);

    if (autoSailCreateDto.config.cronConfig?.expression) {
      await this.createOrUpdateCronConfig(
        createAutoSail._id,
        autoSailCreateDto.config.cronConfig,
      );
    }

    return createAutoSail;
  }

  async update(
    guildId: string,
    userId: string,
    autoSailId: Types.ObjectId,
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

    const autoSail = await this.autoSailModel.findOne({ _id: autoSailId });

    if (autoSailCreateDto.config.cronConfig?.expression) {
      await this.createOrUpdateCronConfig(
        autoSailId,
        autoSailCreateDto.config.cronConfig,
        autoSail.config.cronConfig.cronRefId,
      );
    }
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

  private async createOrUpdateCronConfig(
    autoSailId: Types.ObjectId,
    cronConfig: CronConfigDto,
    cronId?: Types.ObjectId,
  ) {
    if (cronId) {
      await this.cronService.updateCronJob(cronId, cronConfig);
    } else {
      const createCronJob = await this.cronService.createCronJob({
        module: CronModuleTypes.AUTOSAIL,
        expression: cronConfig.expression,
      });

      if (!createCronJob._id) {
        throw new BadRequestException('Failed to create Cron job');
      }

      await this.autoSailModel.updateOne(
        { _id: autoSailId },
        {
          $set: { 'config.cronConfig.cronRefId': createCronJob._id },
        },
      );
    }
  }
}
