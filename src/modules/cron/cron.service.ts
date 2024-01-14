import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CronCreateDto } from 'src/modules/cron/dto/cron-create.dto';
import { Cron } from 'src/modules/cron/model/cron.model';

@Injectable()
export class CronService {
  constructor(
    @InjectModel(Cron.name) private readonly cronModel: Model<Cron>,
  ) {}

  async createCronJob(cronCreateDto: CronCreateDto) {
    return await new this.cronModel(cronCreateDto).save();
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
