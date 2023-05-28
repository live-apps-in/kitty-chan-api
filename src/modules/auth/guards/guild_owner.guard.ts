import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GUILD_USERS } from 'src/core/constants';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';
import { User } from 'src/modules/users/model/user.model';
import { Req } from 'src/types/express.types';

/**Checks if teh current user has admin access to this Guild */
@Injectable()
export class GuildOwner implements CanActivate {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(GuildRepo) private readonly guildRepo: GuildRepo,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      const request: Req = context.switchToHttp().getRequest();

      const { discordId } = request.userData;

      const guildId = request.params.guildId || request.body.guildId;

      if (!guildId) {
        throw new Error();
      }

      const guild = await this.guildRepo.getSingleUserGuild(guildId, discordId);
      if (
        !guild ||
        ![GUILD_USERS.guild_owner, GUILD_USERS.guild_admin].includes(
          guild.userRole,
        )
      ) {
        throw new Error();
      }

      return true;
    } catch (error) {
      throw new HttpException('Forbidden Guild Access', HttpStatus.FORBIDDEN);
    }
  }
}
