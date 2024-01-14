import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CronGRPCService } from 'src/modules/cron/cron-gRPC.service';
import { CronCreateDto } from 'src/modules/cron/dto/cron-create.dto';
import { Cron } from 'src/modules/cron/model/cron.model';

@Injectable()
export class CronService {
  constructor(
    @InjectModel(Cron.name) private readonly cronModel: Model<Cron>,
    @Inject(CronGRPCService) private readonly cronGRPCService: CronGRPCService,
  ) {}

  async createCronJob(cronCreateDto: CronCreateDto) {
    const createCron = await new this.cronModel(cronCreateDto).save();

    await this.cronGRPCService.createCron(createCron as any);

    return createCron;
  }

  async updateCronJob(id: Types.ObjectId, cronCreateDto: CronCreateDto) {
    return await this.cronModel.updateOne(
      { _id: id },
      {
        $set: cronCreateDto,
      },
    );
  }
}
