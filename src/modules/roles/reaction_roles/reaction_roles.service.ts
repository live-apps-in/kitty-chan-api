import { Client } from '@live-apps/discord';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
      channelId: reactionRoleDto.channelId,
    };

    const { messageId } = await this.createReactionRoleInGuild(payload);
    payload.messageId = messageId;
    payload.userId = userId;

    return new this.reactionRolesModel(payload).save();
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

    const payload: IReactionRoles = {
      ...reactionRoleDto,
      guildId,
      channelId: reactionRoleDto.channelId,
    };

    await Promise.all([
      this.updateReactionRoleInGuild(reactionRoleId, payload),
      this.reactionRolesModel.updateOne(
        { _id: reactionRoleId, guildId },
        {
          $set: reactionRoleDto,
        },
      ),
    ]);
  }

  async delete(guildId: string, reactionRoleId: string) {
    await this.reactionRolesModel.deleteOne({ _id: reactionRoleId, guildId });
  }

  private async createReactionRoleInGuild(reactionRole: IReactionRoles) {
    const { channelId, templateId, roleEmojiMapping } = reactionRole;
    /**Build Template */
    const buildTemplate =
      await this.templateService.buildDiscordTemplate(templateId);
    if (!buildTemplate) {
      throw new BadRequestException('Template not set for this reaction role!');
    }

    const createGuildMessage =
      await this.templateService.createTemplateMessageInGuild(
        channelId,
        buildTemplate,
      );

    /**React Emoji to created message */
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

  private async updateReactionRoleInGuild(
    reactionRoleId: string,
    reactionRole: IReactionRoles,
  ) {
    const { channelId, roleEmojiMapping } = reactionRole;

    const getReactionRole = await this.reactionRolesModel.findOne({
      _id: reactionRoleId,
    });
    if (!getReactionRole) {
      throw new BadRequestException('Unable to edit Reaction role!');
    }

    /**Build Template */
    const buildTemplate = await this.templateService.buildDiscordTemplate(
      reactionRole.templateId,
    );
    if (!buildTemplate) {
      throw new BadRequestException('Template not set for this reaction role!');
    }

    await this.templateService.editTemplateMessageInGuild(
      channelId,
      getReactionRole.messageId,
      buildTemplate,
    );

    const emojiToBeUpdated: any[] = this.compareRolesMapping(
      roleEmojiMapping,
      getReactionRole.roleEmojiMapping,
    );

    for (let index = 0; index < emojiToBeUpdated.length; index++) {
      const emoji = emojiToBeUpdated[index].emoji;

      await this.discordClient.message.react(
        channelId,
        getReactionRole.messageId,
        emoji.type === 'standard'
          ? encodeURIComponent(emoji.standardEmoji)
          : encodeURIComponent(`${emoji.name}:${emoji.id}`),
      );
    }
  }

  private compareRolesMapping(newMapping: any[], oldMapping: any[]) {
    const roleEmojiMapDiff = [];

    for (let i = 0; i < newMapping.length; i++) {
      for (let j = 0; j < oldMapping.length; j++) {
        if (newMapping[i].roleId === oldMapping[j].roleId) {
          // assume both objects have a "roleId" property to uniquely identify them
          if (
            newMapping[i].emoji.type === 'standard' &&
            newMapping[i].emoji.standardEmoji !==
              oldMapping[j].emoji.standardEmoji
          ) {
            roleEmojiMapDiff.push(newMapping[i]); // push both objects with different values into the new array
          } else if (
            newMapping[i].emoji.type === 'guild' &&
            newMapping[i].emoji.id !== oldMapping[j].emoji.id
          ) {
            roleEmojiMapDiff.push(newMapping[i]); // push both objects with different values into the new array
          }
          break; // move on to the next object in arr1
        }
      }
    }

    return roleEmojiMapDiff;
  }
}
