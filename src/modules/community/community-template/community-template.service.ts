import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommunityTemplateCreateDto } from 'src/modules/community/community-template/dto/community-template-create.dto';
import { CommunityTemplates } from 'src/modules/community/model/community-templates.model';
import { Template } from 'src/modules/templates/model/template.model';

@Injectable()
export class CommunityTemplateService {
  constructor(
    @InjectModel('discord_templates')
    private readonly templatesModel: Model<Template>,
    @InjectModel('community_templates')
    private readonly communityTemplatesModel: Model<CommunityTemplates>,
  ) {}

  async createCommunityTemplate(
    guildId: string,
    userId: string,
    communityTemplateCreateDto: CommunityTemplateCreateDto,
  ) {
    /**Check duplication with guild templateId */
    const checkCommunityDocument =
      await this.communityTemplatesModel.countDocuments({
        templateId: communityTemplateCreateDto.templateId,
      });
    if (checkCommunityDocument) {
      throw new ConflictException('Community Template already exists');
    }

    const getTemplate = await this.templatesModel.findOne({
      _id: communityTemplateCreateDto.templateId,
    });

    if (!getTemplate) {
      throw new BadRequestException('Unable to create a community template!');
    }

    communityTemplateCreateDto.templateType = getTemplate.type;
    communityTemplateCreateDto.templateTarget = getTemplate.target;

    if (communityTemplateCreateDto.guildId) {
      communityTemplateCreateDto.guildId = guildId;
    }

    if (communityTemplateCreateDto.userId) {
      communityTemplateCreateDto.userId = userId;
    }

    return new this.communityTemplatesModel(communityTemplateCreateDto).save();
  }
}
