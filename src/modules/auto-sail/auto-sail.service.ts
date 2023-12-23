import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AutoSailCreateDto } from 'src/modules/auto-sail/dto/auto-sail.dto';
import { AutoSail } from 'src/modules/auto-sail/model/auto-sail.model';

@Injectable()
export class AutoSailService {
  constructor(
    @InjectModel('auto_sail') private readonly autoSailModel: Model<AutoSail>,
  ) {}

  async create(
    guildId: string,
    userId: string,
    autoSailCreateDto: AutoSailCreateDto,
  ) {
    autoSailCreateDto.guildId = guildId;
    autoSailCreateDto.userId = userId;

    return new this.autoSailModel(autoSailCreateDto).save();
  }
}
