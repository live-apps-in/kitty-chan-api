import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { Guild, GuildSchema } from 'src/modules/guilds/model/guild.model';
import { User, UserSchema } from 'src/modules/users/model/user.model';
import { UserRepository } from 'src/modules/users/repository/user.repo';
import { UserService } from 'src/modules/users/service/user.service';
import { DiscordProvider } from 'src/providers/discord.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Guild.name, schema: GuildSchema },
    ]),
    GuildModule,
  ],
  controllers: [],
  providers: [UserService, UserRepository, DiscordProvider],
  exports: [UserService, UserRepository],
})
export class UserModule {}
