import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsController } from 'src/modules/analytics/analytics.controller';
import { AnalyticsService } from 'src/modules/analytics/analytics.service';
import { MemberLogSchema } from 'src/modules/analytics/model/member_log.model';
import { MessageLogSchema } from 'src/modules/analytics/model/message_log.model';
import { AuthModule } from 'src/modules/auth/auth.module';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [
    AuthModule,
    GuildModule,
    UserModule,
    MongooseModule.forFeature([
      { name: 'message_logs', schema: MessageLogSchema },
      { name: 'member_logs', schema: MemberLogSchema },
    ]),
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
