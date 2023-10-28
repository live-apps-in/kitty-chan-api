import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/modules/auth/auth.module';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';
import { TemplateSchema } from 'src/modules/templates/model/template.model';
import { TemplateRepo } from 'src/modules/templates/repository/template.repository';
import { TemplateController } from 'src/modules/templates/template.controller';
import { TemplateService } from 'src/modules/templates/template.service';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [
    AuthModule,
    GuildModule,
    UserModule,
    MongooseModule.forFeature([
      { name: 'discord_templates', schema: TemplateSchema },
    ]),
  ],
  providers: [TemplateService, TemplateRepo, GuildRepo],
  controllers: [TemplateController],
})
export class TemplateModule {}
