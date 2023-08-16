import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LanguageLibsDto } from 'src/modules/language/dto/language_libs.dto';
import { LanguageLibs } from 'src/modules/language/models/language_libs.model';

@Injectable()
export class LanguageLibService {
  constructor(
    @InjectModel('language_libs')
    private readonly languageLibsModel: Model<LanguageLibs>,
  ) {}

  async viewLanguageLib(guildId: string) {
    return this.languageLibsModel.find({ guildId }, { system: 0 });
  }

  async viewLanguageLibByName(guildId: string, name: string) {
    return this.languageLibsModel.findOne({ guildId, name });
  }

  async createLanguageLib(guildId: string, languageFilterDto: LanguageLibsDto) {
    languageFilterDto.guildId = guildId;

    const getLanguageLib = await this.viewLanguageLibByName(
      guildId,
      languageFilterDto.name,
    );
    if (getLanguageLib) {
      throw new ConflictException('Custom Filter already exists');
    }

    return new this.languageLibsModel(languageFilterDto).save();
  }
}
