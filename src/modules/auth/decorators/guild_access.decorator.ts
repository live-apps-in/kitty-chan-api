// roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';

@Injectable()
export class GuildAccess implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(GuildRepo) private readonly guildRepo: GuildRepo,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      throw new ForbiddenException('Roles not specified for the route');
    }

    const { userData } = context.switchToHttp().getRequest();

    if (!userData?.guildId) {
      throw new ForbiddenException('Forbidden Guild Access');
    }

    const guild = await this.guildRepo.getSingleUserGuild(
      userData.guildId,
      userData.discordId,
    );

    if (!guild || ![...requiredRoles].includes(guild.userRole)) {
      throw new Error();
    }

    return true;
  }
}
