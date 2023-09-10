import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  UseGuards,
} from '@nestjs/common';
import Redis from 'ioredis';
import {
  ExtractContext,
  UserRequestContext,
} from 'src/common/decorators/user-request-context';
import { FeaturesEnum } from 'src/common/enum/features.enum';
import { ROLES } from 'src/common/enum/roles.enum';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { GuildRoles } from 'src/modules/auth/decorators/guild_roles.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GuildAccess } from 'src/modules/auth/guards/guild_access.guard';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { PortalDto } from 'src/modules/portal/dto/portal.dto';
import { PortalService } from 'src/modules/portal/service/portal.service';

@Controller('portal')
export class PortalController {
  constructor(
    @Inject(PortalService) private readonly portalService: PortalService,
    @Inject(PROVIDER_TYPES.RedisClient) private readonly redisClient: Redis,
    @Inject(FeaturesRepo) private readonly featureRepo: FeaturesRepo,
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
    await this.portalService.updatePortalConfig(guildId, portalDto);

    const portalConfig = await this.featureRepo.findSingleFeature(
      guildId,
      FeaturesEnum.PORTAL,
    );

    //Update Redis cache
    await this.redisClient.set(
      `guild-${guildId}:feature:portal`,
      JSON.stringify(portalConfig),
    );

    return portalDto;
  }
}
