import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomLangFilterDto } from 'src/modules/language/dto/custom_lang_filter.dto';
import { DataLibs } from 'src/modules/language/models/data_libs.model';

@Injectable()
export class CustomLangFilterService {
  constructor(
    @InjectModel(DataLibs.name) private readonly dataLibsModel: Model<DataLibs>,
  ) {}

  async viewCustomFilter(guildId: string) {
    return this.dataLibsModel.find({ guildId }, { system: 0 });
  }

  async viewCustomFilterByName(guildId: string, name: string) {
    return this.dataLibsModel.findOne({ guildId, name });
  }

  async createCustomFilter(
    guildId: string,
    customLangFilterDto: CustomLangFilterDto,
  ) {
    customLangFilterDto.guildId = guildId;

    const getDataLib = await this.dataLibsModel.findOne({
      guildId,
      name: customLangFilterDto.name,
    });
    if (getDataLib) {
      throw new ConflictException('Custom Filter already exists');
    }

    return new this.dataLibsModel(customLangFilterDto).save();
  }
}
