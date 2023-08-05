import {
  Controller,
  Get,
  Inject,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { GuildAccess } from 'src/modules/auth/guards/guild_access.guard';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { ROLES } from 'src/common/enum/roles.enum';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildService } from 'src/modules/guilds/service/guild.service';
import { Req } from 'src/types/express.types';

@Controller('/guild')
export class GuildController {
  constructor(
    @Inject(GuildService) private readonly guildService: GuildService,
  ) {}

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN, ROLES.GUILD_MEMBER)
  @Get()
  async getAppGuild(@Request() req: Req) {
    return this.guildService.getGuildById(req.userData.guildId);
  }

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN, ROLES.GUILD_MEMBER)
  @Get('/:guildId')
  async getDiscordGuild(@Param('guildId') guildId: string) {
    return this.guildService.getDiscordGuildById(guildId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async viewUserGuilds(@Request() req: Req) {
    return this.guildService.getUserGuilds(req.userData.userId);
  }
}
