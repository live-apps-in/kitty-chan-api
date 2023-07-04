import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/modules/auth/model/auth.model';
import { GuildController } from 'src/modules/guilds/guild.controller';
import { GuildPermsController } from 'src/modules/guilds/guild_perms.controller';
import { Guild, GuildSchema } from 'src/modules/guilds/model/guild.model';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';
import { GuildService } from 'src/modules/guilds/service/guild.service';
import { GuildPermsService } from 'src/modules/guilds/service/guild_perms.service';
import { User, UserSchema } from 'src/modules/users/model/user.model';
import { DiscordProvider } from 'src/providers/discord.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: User.name, schema: UserSchema },
      { name: Guild.name, schema: GuildSchema },
    ]),
  ],
  controllers: [GuildController, GuildPermsController],
  providers: [GuildService, GuildPermsService, GuildRepo, DiscordProvider],
  exports: [GuildRepo],
})
export class GuildModule {}
