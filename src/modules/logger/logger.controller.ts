import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
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
import { LoggerDto } from 'src/modules/logger/dto/Logger.dto';
import { LoggerService } from 'src/modules/logger/logger.service';

@Controller('logger')
export class LoggerController {
  constructor(
    @Inject(LoggerService) private readonly loggerService: LoggerService,
  ) {}

  /**View Logger config */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Get()
  async viewLogger(@ExtractContext() { guildId }: UserRequestContext) {
    return this.loggerService.viewLogger(guildId);
  }

  /**Edit Logger Config */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Patch()
  async updateLoggerConfig(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() loggerUpdateDto: LoggerDto,
  ) {
    return this.loggerService.updateLogger(guildId, loggerUpdateDto);
  }
}
