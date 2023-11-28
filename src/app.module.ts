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
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ElasticsearchModule.register({ node: process.env.ES_HOST }),
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
