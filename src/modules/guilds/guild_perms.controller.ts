import {
  Controller,
  Inject,
  UseGuards,
  Body,
  Patch,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { GuildAccess } from 'src/modules/auth/decorators/guild_access.decorator';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { ROLES } from 'src/common/enum/roles.enum';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import {
  ExtractContext,
  UserRequestContext,
} from 'src/common/decorators/user-request-context';
import { GuildAdminDto } from 'src/modules/guilds/dto/GuildAdmin.dto';
import { GuildPermsService } from 'src/modules/guilds/service/guild_perms.service';

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
  @Patch('admin')
  async updateAdmin(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() guildAdminDto: GuildAdminDto,
  ) {
    return this.guildPermsService.updateGuildAdmin(guildId, guildAdminDto);
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
}
