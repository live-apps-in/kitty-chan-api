import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/users/model/user.model';
import { Req } from 'src/types/express.types';

/**Check if the current user has a minimum read permission for this Guild */
@Injectable()
export class GuildUser implements CanActivate {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      const request: Req = context.switchToHttp().getRequest();

      const guildId = request.headers['x-guild-id'];

      if (!guildId) {
        throw new Error();
      }

      const user = await this.userModel.findOne({ guilds: guildId });
      if (!user) {
        throw new Error();
      }

      return true;
    } catch (error) {
      throw new HttpException('Forbidden Guild Access', HttpStatus.FORBIDDEN);
    }
  }
}
