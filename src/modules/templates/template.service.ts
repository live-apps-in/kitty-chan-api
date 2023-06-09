import { Inject, Injectable } from '@nestjs/common';
import { TemplateDto } from 'src/modules/templates/dto/template.dto';
import { TemplateTarget } from 'src/modules/templates/enum/template.interface';
import { TemplateRepo } from 'src/modules/templates/repository/template.repository';

@Injectable()
export class TemplateService {
  constructor(
    @Inject(TemplateRepo) private readonly templateRepo: TemplateRepo,
  ) {}

  async create(guildId: string, userId: string, templateDto: TemplateDto) {
    templateDto.guildId = guildId;
    templateDto.userId = userId;

    return this.templateRepo.create(templateDto);
  }

  async getByTemplateId(templateId: string) {
    return this.templateRepo.findById(templateId);
  }

  async getByGuildAndTarget(guildId: string, templateTarget: TemplateTarget) {
    return this.templateRepo.findByGuildAndTarget(guildId, templateTarget);
  }

  async update(templateId: string, templateDto: TemplateDto) {
    await this.templateRepo.update(templateId, templateDto);
  }

  async delete(templateId: string) {
    await this.templateRepo.delete(templateId);
  }
}
