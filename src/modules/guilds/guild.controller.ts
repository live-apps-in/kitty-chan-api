import {
  Controller,
  Get,
  Inject,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildUser } from 'src/modules/auth/guards/guild_user.guard';
import { GuildService } from 'src/modules/guilds/service/guild.service';
import { Req } from 'src/types/express.types';

@Controller('/guild')
export class GuildController {
  constructor(
    @Inject(GuildService) private readonly guildService: GuildService,
  ) {}

  @Get('/:guildId')
  @UseGuards(AuthGuard, GuildUser)
  async guildId(@Param('guildId') guildId: string) {
    return this.guildService.getGuildById(guildId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async viewUserGuilds(@Request() req: Req) {
    return this.guildService.getUserGuilds(req.userData.userId);
  }
}
