import { Client } from '@live-apps/discord';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { Guild } from 'src/modules/guilds/model/guild.model';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';

@Injectable()
export class GuildService {
  constructor(
    @Inject(PROVIDER_TYPES.DiscordClient)
    private readonly discordClient: Client,
    @Inject(GuildRepo) private readonly guildRepo: GuildRepo,
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
  ) {}

  async getGuildById(guildId: string) {
    return this.discordClient.guild.fetch(guildId, { expiry: 3600 });
  }

  /**View all User guilds with user role */
  async getUserGuilds(userId: string) {
    return this.guildRepo.getAllUserGuild(new Types.ObjectId(userId));
  }

  /**Not for regular use(Expensive Call)
   * Use for migration or scheduled sync
   */
  private async syncLocalGuilds() {
    const guilds = await this.discordClient.guild.fetchAll();

    for (let index = 0; index < guilds.length; index++) {
      const guild = await this.discordClient.guild.fetch(guilds[index].id);
      if (!guild) continue;

      await this.guildModel.updateOne(
        { guildId: guild.id },
        { ownerId: guild.owner_id, icon: guild.icon },
      );
    }
    return guilds;
  }
}
