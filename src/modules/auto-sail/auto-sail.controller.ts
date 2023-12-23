import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ExtractContext,
  UserRequestContext,
} from 'src/common/decorators/user-request-context';
import { ROLES } from 'src/common/enum/roles.enum';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildAccess } from 'src/modules/auth/guards/guild_access.guard';
import { AutoSailService } from 'src/modules/auto-sail/auto-sail.service';
import { AutoSailCreateDto } from 'src/modules/auto-sail/dto/auto-sail.dto';

@Controller('auto-sail')
export class AutoSailController {
  constructor(
    @Inject(AutoSailService) private readonly autoSailService: AutoSailService,
  ) {}

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Post()
  async create(
    @ExtractContext() { guildId, userId }: UserRequestContext,
    @Body() autoSailCreateDto: AutoSailCreateDto,
  ) {
    return this.autoSailService.create(guildId, userId, autoSailCreateDto);
  }
}
