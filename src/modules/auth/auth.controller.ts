import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Get('discord')
  @UseGuards()
  async discord(@Query('code') code: string) {
    const auth = await this.authService.discordLogin(code);
    return auth;
  }
}
