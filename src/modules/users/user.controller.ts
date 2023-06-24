import { Controller, Get, Inject, UseGuards, Request } from '@nestjs/common';
import { UserService } from 'src/modules/users/service/user.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { Req } from 'src/types/express.types';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req: Req) {
    return this.userService.profile(req.userData.userId);
  }
}
