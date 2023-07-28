import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LanguageLibsDto } from 'src/modules/language/dto/language_libs.dto';
import { LanguageLibs } from 'src/modules/language/models/language_libs.model';

@Injectable()
export class LanguageFilterService {
  constructor(
    @InjectModel('language_libs')
    private readonly languageLibsModel: Model<LanguageLibs>,
  ) {}

  async viewCustomFilter(guildId: string) {
    return this.languageLibsModel.find({ guildId }, { system: 0 });
  }

  async viewCustomFilterByName(guildId: string, name: string) {
    return this.languageLibsModel.findOne({ guildId, name });
  }

  async createCustomFilter(
    guildId: string,
    languageFilterDto: LanguageLibsDto,
  ) {
    languageFilterDto.guildId = guildId;

    const getLanguageLib = await this.languageLibsModel.findOne({
      guildId,
      name: languageFilterDto.name,
    });
    if (getLanguageLib) {
      throw new ConflictException('Custom Filter already exists');
    }

    return new this.languageLibsModel(languageFilterDto).save();
  }
}
