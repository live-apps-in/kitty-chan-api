import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ExtractContext,
  UserRequestContext,
} from 'src/common/decorators/user-request-context';
import { ROLES } from 'src/common/enum/roles.enum';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildAccess } from 'src/modules/auth/guards/guild_access.guard';
import { LanguageLibService } from 'src/modules/language/language_lib/language_lib.service';
import { LanguageLibsDto } from 'src/modules/language/dto/language_libs.dto';

@Controller('custom_language')
export class LanguageLibController {
  constructor(
    @Inject(LanguageLibService)
    private readonly langLibService: LanguageLibService,
  ) {}

  /**View custom Language Lib*/
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Get('/filters')
  async viewCustomFilter(@ExtractContext() { guildId }: UserRequestContext) {
    return this.langLibService.viewLanguageLib(guildId);
  }

  /**Create custom Language Lib*/
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Post('/filters')
  async addCustomFilter(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() languageFilterDto: LanguageLibsDto,
  ) {
    return this.langLibService.createLanguageLib(guildId, languageFilterDto);
  }
}
