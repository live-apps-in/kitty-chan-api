import { Client } from '@live-apps/discord';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';
import { UserRepository } from 'src/modules/users/repository/user.repo';

@Injectable()
export class UserService {
  constructor(
    @Inject(PROVIDER_TYPES.DiscordClient)
    private readonly discordClient: Client,
    @Inject(UserRepository) private readonly userRepo: UserRepository,
    @Inject(GuildRepo) private readonly guildRepo: GuildRepo,
  ) {}

  /**User Profile */
  async profile(userId: Types.ObjectId) {
    return this.userRepo.findById(userId);
  }

  async syncMutualGuilds(accessToken: string, userId: Types.ObjectId) {
    const userGuilds = await this.discordClient.user.guilds(accessToken);
    if (!userGuilds) {
      throw new HttpException('Unable to retrieve Guild Info', 401);
    }

    ///Get all mutual guilds
    const mutualGuilds = await this.guildRepo.getMutualUserGuilds(
      userGuilds.map((item) => item.id),
    );

    ///Update Discord payload and mutual guilds
    await this.userRepo.update(userId, {
      guilds: mutualGuilds.map((item: any) => item.guildId),
    });
  }
}
