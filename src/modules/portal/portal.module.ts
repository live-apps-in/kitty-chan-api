import { Roles } from '@live-apps/discord/lib/modules/roles/roles';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/modules/auth/model/auth.model';
import {
  Features,
  FeaturesSchema,
} from 'src/modules/features/model/features.model';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { RolesSchema } from 'src/modules/guilds/model/roles.model';
import { Portal, PortalSchema } from 'src/modules/portal/model/portal.model';
import {
  PortalRoom,
  PortalRoomSchema,
} from 'src/modules/portal/model/portal_room.model';
import { PortalController } from 'src/modules/portal/portal.controller';
import { PortalService } from 'src/modules/portal/service/portal.service';
import { RedisProvider } from 'src/providers/redis.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Roles.name, schema: RolesSchema },
      { name: Features.name, schema: FeaturesSchema },
      { name: Portal.name, schema: PortalSchema },
      { name: PortalRoom.name, schema: PortalRoomSchema },
    ]),
    GuildModule,
  ],
  providers: [PortalService, FeaturesRepo, RedisProvider],
  controllers: [PortalController],
})
export class PortalModule {}
