import { Client } from '@live-apps/discord';
import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { Guild } from 'src/modules/guilds/model/guild.model';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';
import { User } from 'src/modules/users/model/user.model';

@Injectable()
export class GuildService {
  constructor(
    @Inject(PROVIDER_TYPES.DiscordClient)
    private readonly discordClient: Client,
    @Inject(GuildRepo) private readonly guildRepo: GuildRepo,
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getGuildById(guildId: string) {
    return this.guildRepo.findById(guildId);
  }

  async getDiscordGuildById(guildId: string) {
    return this.discordClient.guild
      .fetch(guildId, { expiry: 3600 })
      .catch((err) => {
        if (err.status === 404) {
          throw new ForbiddenException('Forbidden Guild Access');
        }
      });
  }

  /**View all User guilds with user role */
  async getUserGuilds(userId: string) {
    return this.guildRepo.getAllUserGuild(new Types.ObjectId(userId));
  }

  /**Search Guild User */
  async wildcardGuildUserSearchByName(guildId: string, name: string) {
    return this.userModel.find(
      {
        guilds: guildId,
        $or: [
          { 'discord.username': { $regex: name, $options: 'i' } },
          { 'discord.global_name': { $regex: name, $options: 'i' } },
        ],
      },
      { name: 1 },
    );
  }

  /**
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
