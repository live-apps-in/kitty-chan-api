import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/modules/auth/model/auth.model';
import {
  Features,
  FeaturesSchema,
} from 'src/modules/features/model/features.model';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { GreetController } from 'src/modules/greet/greet.controller';
import { GreetService } from 'src/modules/greet/greet.service';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { Roles, RolesSchema } from 'src/modules/guilds/model/roles.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Roles.name, schema: RolesSchema },
      { name: Features.name, schema: FeaturesSchema },
    ]),
    GuildModule,
  ],
  providers: [GreetService, FeaturesRepo],
  controllers: [GreetController],
})
export class GreetModule {}
