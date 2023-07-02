import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TemplateDto } from 'src/modules/templates/dto/template.dto';
import { TemplateTarget } from 'src/modules/templates/enum/template.interface';
import { Template } from 'src/modules/templates/model/template.model';

@Injectable()
export class TemplateRepo {
  constructor(
    @InjectModel('discord_templates')
    private readonly templateModel: Model<Template>,
  ) {}

  async create(templateDto: TemplateDto) {
    return new this.templateModel(templateDto).save();
  }

  async findByGuildAndTarget(guildId: string, target: TemplateTarget) {
    return this.templateModel.find({ guildId, target });
  }
}
