import { Roles } from '@live-apps/discord/lib/modules/roles/roles';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Guild } from 'discord.js';
import { Auth, AuthSchema } from 'src/modules/auth/model/auth.model';
import {
  Features,
  FeaturesSchema,
} from 'src/modules/features/model/features.model';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { GuildSchema } from 'src/modules/guilds/model/guild.model';
import { RolesSchema } from 'src/modules/guilds/model/roles.model';
import { LoggerController } from 'src/modules/logger/logger.controller';
import { LoggerService } from 'src/modules/logger/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Guild.name, schema: GuildSchema },
      { name: Features.name, schema: FeaturesSchema },
      { name: Roles.name, schema: RolesSchema },
    ]),
    GuildModule,
  ],
  providers: [LoggerService, FeaturesRepo],
  controllers: [LoggerController],
})
export class LoggerModule {}
