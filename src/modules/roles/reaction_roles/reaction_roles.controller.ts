import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ROLES } from 'src/common/enum/roles.enum';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildAccess } from 'src/modules/auth/guards/guild_access.guard';
import { ReactionRolesService } from 'src/modules/roles/reaction_roles/reaction_roles.service';

@Controller('roles/reaction_roles')
export class ReactionRolesController {
  constructor(
    @Inject(ReactionRolesService)
    private readonly reactionRolesService: ReactionRolesService,
  ) {}

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Post()
  async create() {}
}
