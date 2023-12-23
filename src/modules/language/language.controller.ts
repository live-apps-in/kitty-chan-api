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
import { LanguageFilter } from 'src/modules/language/dto/language_filter.dto';
import { StrongLanguage } from 'src/modules/language/dto/strong_language.dto';
import { LanguageService } from 'src/modules/language/language.service';

@Controller('language')
export class LanguageController {
  constructor(
    @Inject(LanguageService) private readonly languageService: LanguageService,
  ) {}

  /**View Language Config */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Get()
  async viewLanguageConfig(@ExtractContext() { guildId }: UserRequestContext) {
    return this.languageService.viewLanguage(guildId);
  }

  /**Strong Language */
  //Update Strong Language Config
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Patch('strong-language')
  async updateStrongLanguage(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() strongLanguageUpdateDto: StrongLanguage,
  ) {
    await this.languageService.updateStrongLanguage(
      guildId,
      strongLanguageUpdateDto,
    );
    return strongLanguageUpdateDto;
  }

  /**Edit Language Filter Config */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Patch('language-filter')
  async updateLanguageConfig(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() languageFilterUpdateDto: LanguageFilter,
  ) {
    await this.languageService.updateLanguageFilter(
      guildId,
      languageFilterUpdateDto,
    );
    return languageFilterUpdateDto;
  }
}
