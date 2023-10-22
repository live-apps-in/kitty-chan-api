import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guild } from 'src/modules/guilds/model/guild.model';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
  ) {}
  async overview(guildId: string) {
    const guildQuery = this.guildModel.findOne({ guildId });

    const [guild] = (await Promise.all([guildQuery])) as any;
    console.log(guild);
    return {
      membersCount: guild.membersCount,
    };
  }
}
