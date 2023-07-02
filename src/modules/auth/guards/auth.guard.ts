import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/modules/auth/model/auth.model';
import { Req } from 'src/types/express.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      const request: Req = context.switchToHttp().getRequest();
      const bearer: string = request.headers.authorization;
      const token = bearer.split(' ')[1];

      if (!bearer || !token) {
        throw new HttpException(
          'Missing or malformed bearer token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const userAuth = await this.authModel.findOne({
        sessions: decoded.sessionId,
      });
      if (!userAuth) throw new Error();

      const guildId = request.headers['x-guild-id'] as string;
      request.userData = { ...decoded, guildId };

      return true;
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
