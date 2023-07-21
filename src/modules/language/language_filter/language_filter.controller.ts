import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ExtractContext,
  UserRequestContext,
} from 'src/common/decorators/user-request-context';
import { ROLES } from 'src/common/enum/roles.enum';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildAccess } from 'src/modules/auth/guards/guild_access.guard';
import { LanguageFilterService } from 'src/modules/language/language_filter/language_filter.service';
import { DataLibsDto } from 'src/modules/language/dto/data_libs.dto';

@Controller('custom_language')
export class LanguageFilterController {
  constructor(
    @Inject(LanguageFilterService)
    private readonly langFilterService: LanguageFilterService,
  ) {}

  /**View custom Language filter*/
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Get('/filters')
  async viewCustomFilter(@ExtractContext() { guildId }: UserRequestContext) {
    return this.langFilterService.viewCustomFilter(guildId);
  }

  /**View custom Language filter*/
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Post('/filters')
  async addCustomFilter(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() languageFilterDto: DataLibsDto,
  ) {
    return this.langFilterService.createCustomFilter(
      guildId,
      languageFilterDto,
    );
  }
}
