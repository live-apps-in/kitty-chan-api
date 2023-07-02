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
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildAdmin } from 'src/modules/auth/guards/guild_owner.guard';
import { TemplateDto } from 'src/modules/templates/dto/template.dto';
import { TemplateTarget } from 'src/modules/templates/enum/template.interface';
import { TemplateService } from 'src/modules/templates/template.service';

@Controller('template')
export class TemplateController {
  constructor(
    @Inject(TemplateService) private readonly templateService: TemplateService,
  ) {}

  @UseGuards(AuthGuard, GuildAdmin)
  @Post()
  async create(
    @ExtractContext() { guildId, userId }: UserRequestContext,
    @Body() templateDto: TemplateDto,
  ) {
    return this.templateService.create(guildId, userId, templateDto);
  }

  @UseGuards(AuthGuard, GuildAdmin)
  @Get(':target')
  async get(
    @ExtractContext() { guildId }: UserRequestContext,
    @Param('target') templateTarget: TemplateTarget,
  ) {
    return this.templateService.getByGuildAndTarget(guildId, templateTarget);
  }
}
