import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildAdmin } from 'src/modules/auth/guards/guild_owner.guard';
import { TemplateDto } from 'src/modules/templates/dto/template.dto';
import { TemplateService } from 'src/modules/templates/template.service';

@Controller('template')
export class TemplateController {
  constructor(
    @Inject(TemplateService) private readonly templateService: TemplateService,
  ) {}

  @UseGuards(AuthGuard, GuildAdmin)
  @Post()
  async create(@Body() templateDto: TemplateDto) {
    return templateDto;
  }
}
