import { Roles } from '@live-apps/discord/lib/modules/roles/roles';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Guild, User } from 'discord.js';
import { Auth, AuthSchema } from 'src/modules/auth/model/auth.model';
import {
  Features,
  FeaturesSchema,
} from 'src/modules/features/model/features.model';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { GuildSchema } from 'src/modules/guilds/model/guild.model';
import { RolesSchema } from 'src/modules/guilds/model/roles.model';
import { LanguageLibController } from 'src/modules/language/language_lib/language_lib.controller';
import { LanguageLibService } from 'src/modules/language/language_lib/language_lib.service';
import { LanguageController } from 'src/modules/language/language.controller';
import { LanguageService } from 'src/modules/language/language.service';
import { LanguageLibsSchema } from 'src/modules/language/models/language_libs.model';
import { UserSchema } from 'src/modules/users/model/user.model';
import { RedisProvider } from 'src/providers/redis.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Guild.name, schema: GuildSchema },
      { name: User.name, schema: UserSchema },
      { name: Roles.name, schema: RolesSchema },
      { name: Features.name, schema: FeaturesSchema },
      { name: 'language_libs', schema: LanguageLibsSchema },
    ]),
    GuildModule,
  ],
  providers: [LanguageService, LanguageLibService, FeaturesRepo, RedisProvider],
  controllers: [LanguageController, LanguageLibController],
})
export class LanguageModule {}
