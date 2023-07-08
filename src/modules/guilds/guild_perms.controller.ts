import {
  Controller,
  Inject,
  UseGuards,
  Body,
  Patch,
  Post,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { GuildAccess } from 'src/modules/auth/guards/guild_access.guard';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { ROLES } from 'src/common/enum/roles.enum';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import {
  ExtractContext,
  UserRequestContext,
} from 'src/common/decorators/user-request-context';
import { GuildAdminDto } from 'src/modules/guilds/dto/GuildAdmin.dto';
import { GuildPermsService } from 'src/modules/guilds/service/guild_perms.service';
import { GuildRoleDto } from 'src/modules/guilds/dto/GuildRole.dto';

@Controller('/guild')
export class GuildPermsController {
  constructor(
    @Inject(GuildPermsService)
    private readonly guildPermsService: GuildPermsService,
  ) {}

  /**Guild Admin */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER)
  @Post('admin')
  async addAdmin(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() guildAdminDto: GuildAdminDto,
  ) {
    return this.guildPermsService.addGuildAdmin(guildId, guildAdminDto);
  }

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER)
  @Patch('admin/:userId')
  async updateAdmin(
    @ExtractContext() { guildId }: UserRequestContext,
    @Param('userId') userId: string,
    @Body() guildAdminDto: GuildAdminDto,
  ) {
    return this.guildPermsService.updateGuildAdmin(
      guildId,
      userId,
      guildAdminDto,
    );
  }

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER)
  @Delete('admin/:userId')
  async deleteAdmin(
    @ExtractContext() { guildId }: UserRequestContext,
    @Param('userId') userId: string,
  ) {
    return this.guildPermsService.deleteGuildAdmin(guildId, userId);
  }

  /**Guild Role */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER)
  @Post('role')
  async addRole(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() guildRoleDto: GuildRoleDto,
  ) {
    return this.guildPermsService.addGuildRole(guildId, guildRoleDto);
  }

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER)
  @Get('role')
  async viewRole(@ExtractContext() { guildId }: UserRequestContext) {
    return this.guildPermsService.viewRoles(guildId);
  }

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER)
  @Patch('role/:roleId')
  async updateRole(
    @ExtractContext() { guildId }: UserRequestContext,
    @Param('roleId') roleId: string,
    @Body() guildRoleDto: GuildRoleDto,
  ) {
    return this.guildPermsService.updateRole(guildId, roleId, guildRoleDto);
  }

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER)
  @Delete('role/:roleId')
  async deleteRole(
    @ExtractContext() { guildId }: UserRequestContext,
    @Param('roleId') roleId: string,
  ) {
    return this.guildPermsService.deleteRole(guildId, roleId);
  }
}
