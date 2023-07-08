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
export class GuildPerms implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(GuildRepo) private readonly guildRepo: GuildRepo,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const guildPermissions = this.reflector.get<string[]>(
      'guild_perms',
      context.getHandler(),
    );

    if (!guildPermissions) {
      throw new ForbiddenException('Permissions not specified for the route');
    }

    const { userData } = context.switchToHttp().getRequest();

    if (userData.permissions.length === 0) {
      throw new ForbiddenException('Insufficient permissions');
    }

    if (
      !guildPermissions.every((permission) =>
        userData.permissions.includes(permission),
      )
    ) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
