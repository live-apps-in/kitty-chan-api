import { Body, Controller, Inject, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ExtractContext,
  UserRequestContext,
} from 'src/common/decorators/user-request-context';
import { ROLES } from 'src/common/enum/roles.enum';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildAccess } from 'src/modules/auth/guards/guild_access.guard';
import { CommunityTemplateService } from 'src/modules/community/community-template/community-template.service';
import { CommunityTemplateCreateDto } from 'src/modules/community/community-template/dto/community-template-create.dto';

@Controller('community/templates')
export class CommunityTemplateController {
  constructor(
    @Inject(CommunityTemplateService)
    private readonly communityTemplateService: CommunityTemplateService,
  ) {}

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Post()
  async createCommunityTemplate(
    @ExtractContext() { guildId, userId }: UserRequestContext,
    @Body() communityTemplateCreateDto: CommunityTemplateCreateDto,
  ) {
    return this.communityTemplateService.createCommunityTemplate(
      guildId,
      userId,
      communityTemplateCreateDto,
    );
  }

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Patch()
  async updateCommunityTemplate(
    @ExtractContext() { guildId, userId }: UserRequestContext,
    @Body() communityTemplateCreateDto: CommunityTemplateCreateDto,
  ) {
    return this.communityTemplateService.createCommunityTemplate(
      guildId,
      userId,
      communityTemplateCreateDto,
    );
  }
}
