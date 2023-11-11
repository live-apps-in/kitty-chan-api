import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CommunityTemplateService } from 'src/modules/community/community-template/community-template.service';
import { CommunityTemplateController } from 'src/modules/community/community-template/community-templates.controller';
import { CommunityTemplatesSchema } from 'src/modules/community/model/community-templates.model';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { RoleModule } from 'src/modules/roles/role.module';
import { TemplateModule } from 'src/modules/templates/templates.module';

@Module({
  imports: [
    AuthModule,
    GuildModule,
    RoleModule,
    TemplateModule,
    MongooseModule.forFeature([
      { name: 'community_templates', schema: CommunityTemplatesSchema },
    ]),
  ],
  providers: [CommunityTemplateService],
  controllers: [CommunityTemplateController],
  exports: [],
})
export class CommunityModule {}
