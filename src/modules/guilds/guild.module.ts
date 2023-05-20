import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Guild, GuildSchema } from 'src/modules/guilds/model/guild.model';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }]),
  ],
  controllers: [],
  providers: [GuildRepo],
  exports: [GuildRepo],
})
export class GuildModule {}
