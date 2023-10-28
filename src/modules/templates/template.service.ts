import { DiscordEmbeds } from '@live-apps/discord';
import { Inject, Injectable } from '@nestjs/common';
import { DiscordTemplateType } from 'src/common/enum/discord.template.enum';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';
import { TemplateDto } from 'src/modules/templates/dto/template.dto';
import { TemplateTarget } from 'src/modules/templates/enum/template.interface';
import { TemplateRepo } from 'src/modules/templates/repository/template.repository';

@Injectable()
export class TemplateService {
  constructor(
    @Inject(TemplateRepo) private readonly templateRepo: TemplateRepo,
    @Inject(GuildRepo) private readonly guildRepo: GuildRepo,
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

  /**Shared Service */

  async buildDiscordTemplate(templateId: string, content: any = {}) {
    const template = await this.getByTemplateId(templateId);
    if (!template) {
      return null;
    }

    const guild = await this.guildRepo.findById(template.guildId);
    content = { ...content, guildName: guild.name };

    if (template.type === DiscordTemplateType.PLAIN) {
      const plainTemplate = await this.fillPlainTemplate(
        content,
        template.content,
      );
      return {
        type: DiscordTemplateType.PLAIN,
        template: plainTemplate,
      };
    } else if (template.type === DiscordTemplateType.PLAIN) {
      const embedTemplate = await this.fillEmbedTemplate(
        content,
        template.embed,
      );
      return {
        type: DiscordTemplateType.EMBED,
        template: embedTemplate,
      };
    }
  }

  async fillPlainTemplate(payload: any, plainContent: string) {
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        //Dynamic value mapping using this key
        const placeholder = '${' + key + '}';

        plainContent = plainContent.replace(placeholder, payload[key]);
      }
    }

    return plainContent;
  }

  async fillEmbedTemplate(
    payload: any,
    template: DiscordEmbeds,
  ): Promise<DiscordEmbeds> {
    const filledTemplate = { ...template };

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        //Dynamic value mapping using this key
        const placeholder = '${' + key + '}';

        //Title
        if (filledTemplate.title) {
          filledTemplate.title = filledTemplate.title.replace(
            placeholder,
            payload[key],
          );
        }

        //Description
        if (filledTemplate.description) {
          filledTemplate.description = filledTemplate.description.replace(
            placeholder,
            payload[key],
          );
        }

        //Author
        if (filledTemplate.author) {
          filledTemplate.author.name = filledTemplate?.author?.name?.replace(
            placeholder,
            payload[key],
          );
          filledTemplate.author.icon_url =
            filledTemplate?.author?.icon_url?.replace(
              placeholder,
              payload[key],
            );
        }

        //Image
        if (filledTemplate?.image) {
          filledTemplate.image.url = filledTemplate?.image?.url?.replace(
            placeholder,
            payload[key],
          );
        }

        //Footer
        if (filledTemplate.footer) {
          filledTemplate.footer.text = filledTemplate?.footer?.text?.replace(
            placeholder,
            payload[key],
          );
        }

        //Timestamp
        if (filledTemplate.timestamp) {
          filledTemplate.timestamp = filledTemplate?.timestamp?.replace(
            placeholder,
            payload[key],
          );
        }
      }
    }

    return filledTemplate;
  }
}
