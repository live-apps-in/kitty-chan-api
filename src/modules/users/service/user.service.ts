import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/repository/user.repo';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepo: UserRepository,
  ) {}
}
