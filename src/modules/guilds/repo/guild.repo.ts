import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Guild } from 'discord.js';
import { Model, Types } from 'mongoose';
import { GUILD_USERS } from 'src/core/constants';
import { User } from 'src/modules/users/model/user.model';

@Injectable()
export class GuildRepo {
  constructor(
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getMutualUserGuilds(guildIds: string[]) {
    return this.guildModel.find({
      guildId: { $in: guildIds },
    });
  }

  /**Get all guilds of a user with user role */
  async getAllUserGuild(userId: Types.ObjectId) {
    return this.userModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(userId) },
      },
      {
        $addFields: { guildId: '$guilds', discordId: '$discord.id' },
      },
      {
        $project: { guildId: 1, discordId: 1 },
      },
      {
        $unwind: '$guildId',
      },
      {
        $lookup: {
          from: 'guilds',
          localField: 'guildId',
          foreignField: 'guildId',
          as: 'guild',
        },
      },
      {
        $unwind: '$guild',
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ discordId: '$discordId' }, '$guild'] },
        },
      },
      {
        $addFields: {
          userRole: {
            $cond: [
              { $eq: ['$ownerId', '$discordId'] },
              GUILD_USERS.guild_owner,
              {
                $cond: [
                  { $in: ['$discordId', '$admins'] },
                  GUILD_USERS.guild_admin,
                  GUILD_USERS.guild_member,
                ],
              },
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          guildId: 1,
          icon: 1,
          ownerId: 1,
          userRole: 1,
        },
      },
    ]);
  }

  /**Get Guild with userId and guildId */
  async getSingleUserGuild(guildId: string, discordId: string) {
    const guilds = await this.guildModel.aggregate([
      {
        $match: {
          guildId,
          $or: [{ ownerId: discordId }, { admins: discordId }],
        },
      },
      {
        $addFields: {
          userRole: {
            $cond: [
              { $eq: ['$ownerId', discordId] },
              GUILD_USERS.guild_owner,
              {
                $cond: [
                  { $in: [discordId, '$admins'] },
                  GUILD_USERS.guild_admin,
                  GUILD_USERS.guild_member,
                ],
              },
            ],
          },
        },
      },
    ]);

    if (guilds[0]) {
      guilds[0].discordId = discordId;
    }
    return guilds[0];
  }
}
