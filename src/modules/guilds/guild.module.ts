import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/modules/auth/auth.module';
import {
  Features,
  FeaturesSchema,
} from 'src/modules/features/model/features.model';
import { GuildController } from 'src/modules/guilds/guild.controller';
import { GuildPermsController } from 'src/modules/guilds/guild_perms.controller';
import { Guild, GuildSchema } from 'src/modules/guilds/model/guild.model';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';
import { GuildService } from 'src/modules/guilds/service/guild.service';
import { GuildPermsService } from 'src/modules/guilds/service/guild_perms.service';
import { GuildWsGateway } from 'src/modules/guilds/websocket/guild.ws';
import { UserModule } from 'src/modules/users/user.module';
import { DiscordProvider } from 'src/providers/discord.provider';
import { RedisProvider } from 'src/providers/redis.provider';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      { name: Guild.name, schema: GuildSchema },
      { name: Features.name, schema: FeaturesSchema },
    ]),
  ],
  controllers: [GuildPermsController, GuildController],
  providers: [
    GuildService,
    GuildPermsService,
    GuildRepo,
    DiscordProvider,
    GuildWsGateway,
    RedisProvider,
  ],
  exports: [
    GuildRepo,
    MongooseModule.forFeature([
      { name: Guild.name, schema: GuildSchema },
      { name: Features.name, schema: FeaturesSchema },
    ]),
  ],
})
export class GuildModule {}
