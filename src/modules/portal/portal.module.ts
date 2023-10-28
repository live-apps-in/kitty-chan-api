import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/modules/auth/auth.module';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { Portal, PortalSchema } from 'src/modules/portal/model/portal.model';
import { PortalRoomSchema } from 'src/modules/portal/model/portal_room.model';
import { PortalController } from 'src/modules/portal/portal.controller';
import { PortalService } from 'src/modules/portal/service/portal.service';
import { RoleModule } from 'src/modules/roles/role.module';
import { RedisProvider } from 'src/providers/redis.provider';

@Module({
  imports: [
    AuthModule,
    GuildModule,
    RoleModule,
    MongooseModule.forFeature([
      { name: Portal.name, schema: PortalSchema },
      { name: 'portal_rooms', schema: PortalRoomSchema },
    ]),
    GuildModule,
  ],
  providers: [PortalService, FeaturesRepo, RedisProvider],
  controllers: [PortalController],
})
export class PortalModule {}
