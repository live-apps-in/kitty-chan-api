import {
  Controller,
  Get,
  Inject,
  Request,
  UseGuards,
  Param,
  Query,
  Patch,
  Body,
} from '@nestjs/common';
import { GuildAccess } from 'src/modules/auth/guards/guild_access.guard';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { ROLES } from 'src/common/enum/roles.enum';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildService } from 'src/modules/guilds/service/guild.service';
import { Req } from 'src/types/express.types';
import {
  ExtractContext,
  UserRequestContext,
} from 'src/common/decorators/user-request-context';
import { GuildUpdateDto } from 'src/modules/guilds/dto/Guild.dto';

@Controller('guild')
export class GuildController {
  constructor(
    @Inject(GuildService) private readonly guildService: GuildService,
  ) {}

  /**Search Guild Users */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN, ROLES.GUILD_MEMBER)
  @Get('user')
  async searchGuildUser(
    @ExtractContext() { guildId }: UserRequestContext,
    @Query('name') name: string,
  ) {
    return this.guildService.wildcardGuildUserSearchByName(guildId, name);
  }

  /**Get guild by id */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN, ROLES.GUILD_MEMBER)
  @Get(':guildId')
  async getSingleAppGuild(@Param('guildId') guildId: string) {
    return this.guildService.getGuildById(guildId);
  }

  /**Update guild by id */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Patch(':guildId')
  async updateSingleAppGuild(
    @Param('guildId') guildId: string,
    @Body() guildUpdateDto: GuildUpdateDto,
  ) {
    return this.guildService.updateGuildById(guildId, guildUpdateDto);
  }

  /**View All Guilds of a user */
  @UseGuards(AuthGuard)
  @Get()
  async viewUserGuilds(@Request() req: Req) {
    return this.guildService.getUserGuilds(req.userData.userId);
  }
}
