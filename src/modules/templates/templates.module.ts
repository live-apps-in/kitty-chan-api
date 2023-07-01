import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Guild, User } from 'discord.js';
import { Auth, AuthSchema } from 'src/modules/auth/model/auth.model';
import { GuildSchema } from 'src/modules/guilds/model/guild.model';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';
import { TemplateRepo } from 'src/modules/templates/repository/template.repository';
import { TemplateController } from 'src/modules/templates/template.controller';
import { TemplateService } from 'src/modules/templates/template.service';
import { UserSchema } from 'src/modules/users/model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Guild.name, schema: GuildSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [TemplateService, TemplateRepo, GuildRepo],
  controllers: [TemplateController],
})
export class TemplateModule {}
