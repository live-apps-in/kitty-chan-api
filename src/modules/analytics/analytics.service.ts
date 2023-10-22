import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guild } from 'src/modules/guilds/model/guild.model';
import { User } from 'src/modules/users/model/user.model';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async overview(guildId: string) {
    const guildQuery = this.guildModel.findOne({ guildId });
    const activeMembersQuery = this.userModel.countDocuments({
      guilds: guildId,
      activityStatus: 'online',
    });

    const [guild, activeMembers] = (await Promise.all([
      guildQuery,
      activeMembersQuery,
    ])) as any;

    return {
      members: {
        count: guild.membersCount,
        active: activeMembers,
      },
    };
  }
}
