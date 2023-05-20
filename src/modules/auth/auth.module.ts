import { Module } from '@nestjs/common';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { DiscordAuthService } from 'src/modules/auth/service/discord_auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, DiscordAuthService],
  exports: [],
})
export class AuthModule {}
