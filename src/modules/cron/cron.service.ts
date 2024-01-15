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

    await this.cronGRPCService.createCron({
      id: createCron._id.toString(),
      expression: createCron.expression,
    });

    return createCron;
  }

  async updateCronJob(id: Types.ObjectId, cronCreateDto: CronCreateDto) {
    await Promise.all([
      this.cronModel.updateOne(
        { _id: id },
        {
          $set: cronCreateDto,
        },
      ),
      this.cronGRPCService.updateCron({
        id: id.toString(),
        expression: cronCreateDto.expression,
      }),
    ]);
  }

  async deleteCronJob(id: Types.ObjectId, cronCreateDto: CronCreateDto) {
    await Promise.all([
      this.cronModel.deleteOne({ _id: id }),
      this.cronGRPCService.deleteCron({
        id: id.toString(),
        expression: cronCreateDto.expression,
      }),
    ]);
  }
}
