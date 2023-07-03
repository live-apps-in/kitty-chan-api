import {
  Controller,
  Get,
  Inject,
  Request,
  UseGuards,
  Param,
  Body,
  Patch,
  Post,
} from '@nestjs/common';
import { GuildAccess } from 'src/modules/auth/decorators/guild_access.decorator';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { ROLES } from 'src/common/enum/roles.enum';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildService } from 'src/modules/guilds/service/guild.service';
import { Req } from 'src/types/express.types';
import {
  ExtractContext,
  UserRequestContext,
} from 'src/common/decorators/user-request-context';
import { GuildAdminDto } from 'src/modules/guilds/dto/GuildAdmin.dto';

@Controller('/guild')
export class GuildController {
  constructor(
    @Inject(GuildService) private readonly guildService: GuildService,
  ) {}

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN, ROLES.GUILD_MEMBER)
  @Get('/:guildId')
  async guildId(@Param('guildId') guildId: string) {
    return this.guildService.getGuildById(guildId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async viewUserGuilds(@Request() req: Req) {
    return this.guildService.getUserGuilds(req.userData.userId);
  }

  /**Guild Admin */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER)
  @Post('admin')
  async addAdmin(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() guildAdminDto: GuildAdminDto,
  ) {
    return this.guildService.addGuildAdmin(guildId, guildAdminDto);
  }

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER)
  @Patch('admin')
  async deleteAdmin(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() guildAdminDto: GuildAdminDto,
  ) {
    return this.guildService.updateGuildAdmin(guildId, guildAdminDto);
  }
}
