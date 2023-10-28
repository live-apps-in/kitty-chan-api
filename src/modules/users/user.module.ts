import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/modules/auth/auth.module';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { Roles, RolesSchema } from 'src/modules/guilds/model/roles.model';
import { User, UserSchema } from 'src/modules/users/model/user.model';
import { UserRepository } from 'src/modules/users/repository/user.repo';
import { UserService } from 'src/modules/users/service/user.service';
import { UserController } from 'src/modules/users/user.controller';
import { DiscordProvider } from 'src/providers/discord.provider';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    GuildModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Roles.name, schema: RolesSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, DiscordProvider],
  exports: [
    UserService,
    UserRepository,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule {}
