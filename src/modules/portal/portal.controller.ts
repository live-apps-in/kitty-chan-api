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
import { PortalDto } from 'src/modules/portal/dto/portal.dto';
import { PortalService } from 'src/modules/portal/service/portal.service';

@Controller('portal')
export class PortalController {
  constructor(
    @Inject(PortalService) private readonly portalService: PortalService,
  ) {}

  /**View Portal Config */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Get()
  async getPortalConfig(@ExtractContext() { guildId }: UserRequestContext) {
    return this.portalService.getPortalConfig(guildId);
  }

  /**Update Portal Config */
  @UseGuards(AuthGuard, GuildAccess)
  @GuildRoles(ROLES.GUILD_OWNER, ROLES.GUILD_ADMIN)
  @Patch()
  async updatePortalConfig(
    @ExtractContext() { guildId }: UserRequestContext,
    @Body() portalDto: PortalDto,
  ) {
    return this.portalService.updatePortalConfig(guildId, portalDto);
  }
}
