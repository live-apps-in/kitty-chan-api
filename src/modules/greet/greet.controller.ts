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
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildAdmin } from 'src/modules/auth/guards/guild_owner.guard';
import { GreetDto } from 'src/modules/greet/dto/Greet.dto';
import { GreetService } from 'src/modules/greet/greet.service';

@Controller('greet')
export class GreetController {
  constructor(
    @Inject(GreetService) private readonly greetService: GreetService,
  ) {}

  /**View Greet Config */
  @UseGuards(AuthGuard, GuildAdmin)
  @Get()
  async viewGreetConfig(@ExtractContext() { guildId }: UserRequestContext) {
    return this.greetService.viewGreet(guildId);
  }

  /**Edit Greet Config */
  @UseGuards(AuthGuard, GuildAdmin)
  @Patch()
  async updateGreetConfig(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() greetUpdateDto: GreetDto,
  ) {
    return this.greetService.updateGreet(guildId, greetUpdateDto);
  }
}
