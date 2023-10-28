import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { GreetController } from 'src/modules/greet/greet.controller';
import { GreetService } from 'src/modules/greet/greet.service';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { RoleModule } from 'src/modules/roles/role.module';

@Module({
  imports: [AuthModule, GuildModule, RoleModule],
  providers: [GreetService, FeaturesRepo],
  controllers: [GreetController],
})
export class GreetModule {}
