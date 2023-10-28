import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { LanguageLibController } from 'src/modules/language/language_lib/language_lib.controller';
import { LanguageLibService } from 'src/modules/language/language_lib/language_lib.service';
import { LanguageController } from 'src/modules/language/language.controller';
import { LanguageService } from 'src/modules/language/language.service';
import { LanguageLibsSchema } from 'src/modules/language/models/language_libs.model';
import { RedisProvider } from 'src/providers/redis.provider';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [
    AuthModule,
    GuildModule,
    UserModule,
    MongooseModule.forFeature([
      { name: 'language_libs', schema: LanguageLibsSchema },
    ]),
    GuildModule,
  ],
  providers: [LanguageService, LanguageLibService, FeaturesRepo, RedisProvider],
  controllers: [LanguageController, LanguageLibController],
})
export class LanguageModule {}
