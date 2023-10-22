import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsController } from 'src/modules/analytics/analytics.controller';
import { AnalyticsService } from 'src/modules/analytics/analytics.service';
import {
  MemberLog,
  MemberLogSchema,
} from 'src/modules/analytics/model/member_log.model';
import {
  MessageLog,
  MessageLogSchema,
} from 'src/modules/analytics/model/message_log.model';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Auth, AuthSchema } from 'src/modules/auth/model/auth.model';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { Guild, GuildSchema } from 'src/modules/guilds/model/guild.model';
import { Roles, RolesSchema } from 'src/modules/guilds/model/roles.model';
import { User, UserSchema } from 'src/modules/users/model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MessageLog.name, schema: MessageLogSchema },
      { name: MemberLog.name, schema: MemberLogSchema },
      { name: Auth.name, schema: AuthSchema },
      { name: Roles.name, schema: RolesSchema },
      { name: Guild.name, schema: GuildSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
    GuildModule,
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
