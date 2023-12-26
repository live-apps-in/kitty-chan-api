import { Client } from '@live-apps/discord';
import {
  Injectable,
  Inject,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RedisService } from 'src/common/service/redis.service';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { AuthSession } from 'src/modules/auth/model/auth-session.model';
import { GuildUpdateDto } from 'src/modules/guilds/dto/Guild.dto';
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
    @InjectModel('auth_session')
    private readonly authSessionModel: Model<AuthSession>,
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {}

  async getGuildById(guildId: string) {
    return this.guildRepo.findById(guildId);
  }

  async updateGuildById(guildId: string, guildUpdateDto: GuildUpdateDto) {
    await this.guildRepo.updateById(guildId, guildUpdateDto);
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
      { name: 1, discord: 1 },
    );
  }

  async getChannels(guildId: string) {
    const channels = await this.discordClient.channel.fetchAll(guildId, {
      expiry: 300,
    });

    return channels
      .filter((obj) => obj.type === 0)
      .map(({ id, name }) => ({ id, name }));
  }

  /**Sync User Guilds */
  async syncUserGuilds(sessionId: string) {
    const userDiscordAccessToken = await this.authSessionModel.findOne(
      { sessionId },
      { userId: 1, discordAccessToken: 1 },
    );

    if (!userDiscordAccessToken?.discordAccessToken) {
      throw new UnauthorizedException('Session Expired');
    }

    const { userId, discordAccessToken } = userDiscordAccessToken;
    //Fetch User Guild from Discord API
    const userDiscordGuilds = await this.discordClient.user
      .guilds(discordAccessToken)
      .then((guilds) => {
        return guilds.map((guild) => guild.id);
      });
    //Fetch app Guild from cache
    const appGuilds = await this.redisService.getFromSet('kittychan-guildIds');
    const updatedGuilds = userDiscordGuilds.filter((guild) =>
      appGuilds.includes(guild),
    );

    await this.userModel.updateOne(
      { _id: userId },
      {
        $addToSet: { guilds: { $each: updatedGuilds } },
      },
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
