import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ExtractContext,
  UserRequestContext,
} from 'src/common/decorators/user-request-context';
import { ROLES } from 'src/common/enum/roles.enum';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildAccess } from 'src/modules/auth/guards/guild_access.guard';
import { ReactionRolesDto } from 'src/modules/roles/reaction_roles/dto/reaction_roles.dto';
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
  async create(
    @ExtractContext() { guildId, userId }: UserRequestContext,
    @Body() reactionRolesDto: ReactionRolesDto,
  ) {
    return this.reactionRolesService.create(guildId, userId, reactionRolesDto);
  }

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Get()
  async view(@ExtractContext() { guildId }: UserRequestContext) {
    return this.reactionRolesService.get(guildId);
  }

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Patch(':id')
  async update(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() reactionRolesDto: ReactionRolesDto,
    @Param('id') reactionRoleId: string,
  ) {
    return this.reactionRolesService.update(
      guildId,
      reactionRoleId,
      reactionRolesDto,
    );
  }

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Delete(':id')
  async delete(
    @ExtractContext() { guildId }: UserRequestContext,
    @Param('id') reactionRoleId: string,
  ) {
    return this.reactionRolesService.delete(guildId, reactionRoleId);
  }
}
