import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/modules/auth/auth.controller';
import { Auth, AuthSchema } from 'src/modules/auth/model/auth.model';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { DiscordAuthService } from 'src/modules/auth/service/discord_auth.service';
import { UserModule } from 'src/modules/users/user.module';
import { DiscordProvider } from 'src/providers/discord.provider';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, DiscordAuthService, DiscordProvider],
  exports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
})
export class AuthModule {}
