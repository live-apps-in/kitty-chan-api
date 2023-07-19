import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataLibsDto } from 'src/modules/language/dto/data_libs.dto';
import { DataLibs } from 'src/modules/language/models/data_libs.model';

@Injectable()
export class LanguageFilterService {
  constructor(
    @InjectModel('data_libs') private readonly dataLibsModel: Model<DataLibs>,
  ) {}

  async viewCustomFilter(guildId: string) {
    return this.dataLibsModel.find({ guildId }, { system: 0 });
  }

  async viewCustomFilterByName(guildId: string, name: string) {
    return this.dataLibsModel.findOne({ guildId, name });
  }

  async createCustomFilter(guildId: string, languageFilterDto: DataLibsDto) {
    languageFilterDto.guildId = guildId;

    const getDataLib = await this.dataLibsModel.findOne({
      guildId,
      name: languageFilterDto.name,
    });
    if (getDataLib) {
      throw new ConflictException('Custom Filter already exists');
    }

    return new this.dataLibsModel(languageFilterDto).save();
  }
}
