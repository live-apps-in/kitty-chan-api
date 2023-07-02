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
import { GuildAccess } from 'src/modules/auth/decorators/guild_access.decorator';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { ROLES } from 'src/common/enum/roles.enum';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GreetDto } from 'src/modules/greet/dto/Greet.dto';
import { GreetService } from 'src/modules/greet/greet.service';

@Controller('greet')
export class GreetController {
  constructor(
    @Inject(GreetService) private readonly greetService: GreetService,
  ) {}

  /**View Greet Config */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Get()
  async viewGreetConfig(@ExtractContext() { guildId }: UserRequestContext) {
    return this.greetService.viewGreet(guildId);
  }

  /**Edit Greet Config */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Patch()
  async updateGreetConfig(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() greetUpdateDto: GreetDto,
  ) {
    return this.greetService.updateGreet(guildId, greetUpdateDto);
  }
}
