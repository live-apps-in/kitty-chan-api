import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildService } from 'src/modules/guilds/service/guild.service';
import { Req } from 'src/types/express.types';

@Controller('/guild')
export class GuildController {
  constructor(
    @Inject(GuildService) private readonly guildService: GuildService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async viewGuilds(@Request() req: Req) {
    return this.guildService.getUserGuilds(req.userData.userId);
  }
}
