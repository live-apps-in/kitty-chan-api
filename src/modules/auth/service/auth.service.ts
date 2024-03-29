import { Client } from '@live-apps/discord';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import 'dotenv/config';
import { Model, Types } from 'mongoose';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { AuthSession } from 'src/modules/auth/model/auth-session.model';
import { DiscordAuthService } from 'src/modules/auth/service/discord_auth.service';
import { UserRepository } from 'src/modules/users/repository/user.repo';
import { UserService } from 'src/modules/users/service/user.service';
import { v4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DiscordAuthService)
    private readonly discordAuth: DiscordAuthService,
    @Inject(PROVIDER_TYPES.DiscordClient)
    private readonly discordClient: Client,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(UserService) private readonly userService: UserService,
    @InjectModel('auth_session')
    private readonly authSessionModel: Model<AuthSession>,
  ) {}

  async discordLogin(code: string) {
    const getToken = await this.discordAuth.token(code);

    /**Fetch Discord User profile */
    const discordUserProfile = await this.discordClient.user.profile(
      getToken.access_token,
    );

    /**Find or create local user */
    let localUserId: string;

    const localUser = await this.userRepository.getByDiscordId(
      discordUserProfile.id,
    );
    localUserId = localUser?.id;

    if (!localUser) {
      const createdUser = await this.userRepository.create({
        name: discordUserProfile.username,
        discord: discordUserProfile,
      });

      localUserId = createdUser.id;
    } else {
      /**Update local user profile */
      await this.userRepository.update(new Types.ObjectId(localUserId), {
        discord: discordUserProfile,
      });
    }

    /**Sync user & bot mutual guilds */
    await this.userService.syncMutualGuilds(
      getToken.access_token,
      new Types.ObjectId(localUserId),
    );

    /**Create auth session */
    const sessionId = v4();
    const jwt = await this.jwtService.signAsync(
      {
        userId: localUserId,
        discordId: discordUserProfile.id,
        sessionId,
      },
      { expiresIn: '7d' },
    );

    await this.authSessionModel.insertMany({
      userId: new Types.ObjectId(localUserId),
      discordAccessToken: getToken.access_token,
      sessionId,
    });

    return {
      accessToken: jwt,
    };
  }
}
