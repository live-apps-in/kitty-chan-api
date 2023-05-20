import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Guild } from 'discord.js';
import { Model } from 'mongoose';

@Injectable()
export class GuildRepo {
  constructor(
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
  ) {}

  async getMutualUserGuilds(guildIds: string[]) {
    return this.guildModel.find({
      guildId: { $in: guildIds },
    });
  }
}
