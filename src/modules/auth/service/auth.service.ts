import { Inject, Injectable } from '@nestjs/common';
import 'dotenv/config';
import { DiscordAuthService } from 'src/modules/auth/service/discord_auth.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DiscordAuthService)
    private readonly discordAuth: DiscordAuthService,
  ) {}

  async discordLogin(code: string) {
    const getToken = await this.discordAuth.token(code);
  }
}
