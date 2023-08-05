import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ROLES } from 'src/common/enum/roles.enum';
import { Guild } from 'src/modules/guilds/model/guild.model';
import { User } from 'src/modules/users/model/user.model';

@Injectable()
export class GuildRepo {
  constructor(
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findById(guildId: string) {
    return this.guildModel.findOne({ guildId });
  }

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
              ROLES.GUILD_OWNER,
              {
                $cond: [
                  { $in: ['$discordId', '$admins'] },
                  ROLES.GUILD_ADMIN,
                  ROLES.GUILD_MEMBER,
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
              ROLES.GUILD_OWNER,
              {
                $cond: [
                  { $in: [discordId, '$admins'] },
                  ROLES.GUILD_ADMIN,
                  ROLES.GUILD_MEMBER,
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
