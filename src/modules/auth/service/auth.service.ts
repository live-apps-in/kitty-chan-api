import { Client } from '@live-apps/discord';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import 'dotenv/config';
import { Model, Types } from 'mongoose';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { Auth } from 'src/modules/auth/model/auth.model';
import { DiscordAuthService } from 'src/modules/auth/service/discord_auth.service';
import { UserRepository } from 'src/modules/users/repository/user.repo';
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
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  async discordLogin(code: string) {
    const getToken = await this.discordAuth.token(code);

    ///Fetch Discord User profile
    const discordUserProfile = await this.discordClient.user.profile(
      getToken.access_token,
    );

    ///Fnd or Create Local user
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
      await this.authModel.insertMany({ userId: createdUser._id });
    }

    ///Create session for the user
    const sessionId = v4();
    const jwt = await this.jwtService.signAsync(
      {
        userId: localUserId,
        discordId: discordUserProfile.id,
        sessionId,
      },
      { expiresIn: '7d' },
    );

    await this.authModel.updateOne(
      { userId: new Types.ObjectId(localUserId) },
      {
        $push: {
          sessions: sessionId,
        },
      },
    );

    return {
      accessToken: jwt,
    };
  }
}
