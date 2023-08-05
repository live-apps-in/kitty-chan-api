import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GUILD_PERMS } from 'src/common/enum/permissions.enum';
import { ROLES } from 'src/common/enum/roles.enum';
import { Roles } from 'src/modules/guilds/model/roles.model';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';
import { Req } from 'src/types/express.types';

@Injectable()
export class GuildAccess implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(GuildRepo) private readonly guildRepo: GuildRepo,
    @InjectModel(Roles.name) private readonly rolesModel: Model<Roles>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Req = context.switchToHttp().getRequest();
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
      throw new ForbiddenException('Forbidden Guild Access');
    }

    let permissions: string[];
    if (guild.userRole === ROLES.GUILD_ADMIN) {
      permissions = Object.values(GUILD_PERMS);
    } else {
      const roleId =
        guild.staffs.find((admin) => admin.userId === userData.userId)
          ?.roleId || null;

      const roles = await this.rolesModel.findOne({ _id: roleId });
      permissions = roles?.permissions || [];
    }

    request.userData = { ...userData, permissions };
    return true;
  }
}
