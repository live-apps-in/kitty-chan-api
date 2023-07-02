import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ExtractContext,
  UserRequestContext,
} from 'src/common/decorators/user-request-context';
import { GuildAccess } from 'src/modules/auth/decorators/guild_access.decorator';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { ROLES } from 'src/common/enum/roles.enum';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { TemplateDto } from 'src/modules/templates/dto/template.dto';
import { TemplateTarget } from 'src/modules/templates/enum/template.interface';
import { TemplateService } from 'src/modules/templates/template.service';

@Controller('template')
export class TemplateController {
  constructor(
    @Inject(TemplateService) private readonly templateService: TemplateService,
  ) {}

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Post()
  async create(
    @ExtractContext() { guildId, userId }: UserRequestContext,
    @Body() templateDto: TemplateDto,
  ) {
    return this.templateService.create(guildId, userId, templateDto);
  }

  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Get(':target')
  async get(
    @ExtractContext() { guildId }: UserRequestContext,
    @Param('target') templateTarget: TemplateTarget,
  ) {
    return this.templateService.getByGuildAndTarget(guildId, templateTarget);
  }
}
