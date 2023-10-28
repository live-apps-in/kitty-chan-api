import { Client } from '@live-apps/discord';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiscordTemplateType } from 'src/common/enum/discord.template.enum';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { ReactionRolesDto } from 'src/modules/roles/reaction_roles/dto/reaction_roles.dto';
import { IReactionRoles } from 'src/modules/roles/reaction_roles/interface/reaction_roles.interface';
import { ReactionRoles } from 'src/modules/roles/reaction_roles/model/reaction_roles.model';
import { TemplateService } from 'src/modules/templates/template.service';

@Injectable()
export class ReactionRolesService {
  constructor(
    @InjectModel('reaction_roles')
    private readonly reactionRolesModel: Model<ReactionRoles>,
    @Inject(TemplateService) private readonly templateService: TemplateService,
    @Inject(PROVIDER_TYPES.DiscordClient)
    private readonly discordClient: Client,
  ) {}

  async create(
    guildId: string,
    userId: string,
    reactionRoleDto: ReactionRolesDto,
  ) {
    const getReactionRole = await this.reactionRolesModel.findOne({
      name: reactionRoleDto.name,
      guildId,
    });

    if (getReactionRole) {
      throw new ConflictException('Reaction Role already exists!');
    }

    const payload: IReactionRoles = {
      ...reactionRoleDto,
      guildId,
      userId,
      channelId: reactionRoleDto.channelId,
    };

    const reactionRole = await new this.reactionRolesModel(payload).save();

    const { messageId } = await this.createReactionRoleInGuild(payload);

    await this.reactionRolesModel.updateOne(
      { _id: reactionRole._id },
      {
        $set: { messageId },
      },
    );
  }

  async get(guildId: string) {
    return this.reactionRolesModel.find({ guildId });
  }

  async update(
    guildId: string,
    reactionRoleId: string,
    reactionRoleDto: ReactionRolesDto,
  ) {
    const getReactionRole = await this.reactionRolesModel.findOne({
      _id: reactionRoleId,
      guildId,
    });

    if (getReactionRole?.name !== reactionRoleDto.name) {
      const getReactionRoleByName = await this.reactionRolesModel.findOne({
        name: reactionRoleDto.name,
        guildId,
      });

      if (getReactionRoleByName) {
        throw new ConflictException(
          'Reaction Role with this name already exists!',
        );
      }
    }

    await this.reactionRolesModel.updateOne(
      { _id: reactionRoleId, guildId },
      {
        $set: reactionRoleDto,
      },
    );
  }

  async delete(guildId: string, reactionRoleId: string) {
    await this.reactionRolesModel.deleteOne({ _id: reactionRoleId, guildId });
  }

  private async createReactionRoleInGuild(reactionRole: IReactionRoles) {
    /**fetch and build Template */
    const buildTemplate = await this.templateService.buildDiscordTemplate(
      reactionRole.templateId,
    );
    if (!buildTemplate) {
      throw new BadRequestException('Template not set for this reaction role!');
    }

    let createGuildMessage;
    if (buildTemplate.type === DiscordTemplateType.PLAIN) {
      createGuildMessage = await this.discordClient.message.send(
        reactionRole.channelId,
        buildTemplate.template as any,
      );
    } else if (buildTemplate.type === DiscordTemplateType.EMBED) {
      createGuildMessage = await this.discordClient.message.sendEmbed(
        reactionRole.channelId,
        [buildTemplate.template] as any,
      );
    }

    if (!createGuildMessage.id) {
      throw new BadRequestException('Unable to create reaction role!');
    }

    /**React Emoji to created message */
    const { roleEmojiMapping, channelId } = reactionRole;

    for (let index = 0; index < roleEmojiMapping.length; index++) {
      const emoji = roleEmojiMapping[index].emoji;

      await this.discordClient.message.react(
        channelId,
        createGuildMessage.id,
        emoji.type === 'standard'
          ? encodeURIComponent(emoji.standardEmoji)
          : encodeURIComponent(`${emoji.name}:${emoji.id}`),
      );
    }

    return { messageId: createGuildMessage.id };
  }
}
