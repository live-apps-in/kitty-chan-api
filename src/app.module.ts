import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { GreetModule } from 'src/modules/greet/greet.module';
import { TemplateModule } from 'src/modules/templates/templates.module';
import { LoggerModule } from 'src/modules/logger/logger.module';
import { LanguageModule } from 'src/modules/language/language.module';
import { PortalModule } from 'src/modules/portal/portal.module';
import { AnalyticsModule } from 'src/modules/analytics/analytics.module';
import { RoleModule } from 'src/modules/roles/role.module';
import { CommunityModule } from 'src/modules/community/community.module';
import { AutoSailModule } from 'src/modules/auto-sail/auto-sail.module';
import { CronModule } from 'src/modules/cron/cron.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    RoleModule,
    GuildModule,
    GreetModule,
    LoggerModule,
    LanguageModule,
    TemplateModule,
    PortalModule,
    AnalyticsModule,
    CommunityModule,
    AutoSailModule,
    CronModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
