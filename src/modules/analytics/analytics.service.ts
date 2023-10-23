import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageLog } from 'src/modules/analytics/model/message_log.model';
import { Guild } from 'src/modules/guilds/model/guild.model';
import { User } from 'src/modules/users/model/user.model';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel('message_logs')
    private readonly messageLogModel: Model<MessageLog>,
  ) {}
  async overview(guildId: string) {
    //Guild
    const guildQuery = this.guildModel.findOne({ guildId });

    //Fetch active members count
    const activeMembersQuery = this.userModel.countDocuments({
      guilds: guildId,
      activityStatus: 'online',
    });

    //Fetch total message count
    const messageCountQuery = await this.messageLogModel.countDocuments({
      guildId,
    });

    const [guild, activeMembers, messageCount] = (await Promise.all([
      guildQuery,
      activeMembersQuery,
      messageCountQuery,
    ])) as any;

    return {
      members: {
        count: guild.membersCount,
        active: activeMembers,
      },
      messages: {
        count: messageCount,
      },
    };
  }
}
