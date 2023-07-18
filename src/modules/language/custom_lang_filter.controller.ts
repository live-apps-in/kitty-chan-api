import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ExtractContext,
  UserRequestContext,
} from 'src/common/decorators/user-request-context';
import { ROLES } from 'src/common/enum/roles.enum';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildAccess } from 'src/modules/auth/guards/guild_access.guard';
import { CustomLangFilterService } from 'src/modules/language/custom_lang_filter.service';
import { CustomLangFilterDto } from 'src/modules/language/dto/custom_lang_filter.dto';

@Controller('custom_language')
export class CustomLangFilterController {
  constructor(
    @Inject(CustomLangFilterService)
    private readonly customLangFilterService: CustomLangFilterService,
  ) {}

  /**View custom Language filter*/
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Get()
  async viewCustomFilter(@ExtractContext() { guildId }: UserRequestContext) {
    return this.customLangFilterService.viewCustomFilter(guildId);
  }

  /**View custom Language filter*/
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Post()
  async addCustomFilter(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() createCustomLangFilterDto: CustomLangFilterDto,
  ) {
    return this.customLangFilterService.createCustomFilter(
      guildId,
      createCustomLangFilterDto,
    );
  }
}
