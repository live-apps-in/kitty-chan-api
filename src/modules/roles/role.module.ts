import { Roles } from '@live-apps/discord/lib/modules/roles/roles';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/modules/auth/auth.module';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { RolesSchema } from 'src/modules/guilds/model/roles.model';
import { ReactionRolesSchema } from 'src/modules/roles/reaction_roles/model/reaction_roles.model';
import { ReactionRolesController } from 'src/modules/roles/reaction_roles/reaction_roles.controller';
import { ReactionRolesService } from 'src/modules/roles/reaction_roles/reaction_roles.service';

@Module({
  imports: [
    AuthModule,
    GuildModule,
    MongooseModule.forFeature([
      { name: Roles.name, schema: RolesSchema },
      { name: 'reaction_roles', schema: ReactionRolesSchema },
    ]),
  ],
  providers: [ReactionRolesService],
  controllers: [ReactionRolesController],
  exports: [
    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }]),
  ],
})
export class RoleModule {}
