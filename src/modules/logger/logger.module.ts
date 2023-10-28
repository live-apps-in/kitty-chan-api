import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { LoggerController } from 'src/modules/logger/logger.controller';
import { LoggerService } from 'src/modules/logger/logger.service';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [AuthModule, GuildModule, UserModule],
  providers: [LoggerService, FeaturesRepo],
  controllers: [LoggerController],
})
export class LoggerModule {}
