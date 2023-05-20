import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DiscordAuthService {
  private DISCORD_OAUTH_URL = 'https://discord.com/api/v10/oauth2';
  private DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  private DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  private DISCORD_REDIRECT_URL = process.env.DISCORD_CALLBACK_URL;

  async token(code: string) {
    try {
      const response = await axios.post(
        `${this.DISCORD_OAUTH_URL}/token`,
        `client_id=${this.DISCORD_CLIENT_ID}&client_secret=${this.DISCORD_CLIENT_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=${this.DISCORD_REDIRECT_URL}&scope=identify`,
      );

      if (!response.data) {
        throw new HttpException('Discord Authentication Failed', 401);
      }
      return response.data;
    } catch (error) {
      console.error('Error getting access token:', error.response.data);
      throw error;
    }
  }
}
