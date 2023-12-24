import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisService } from 'src/common/service/redis.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AutoSailController } from 'src/modules/auto-sail/auto-sail.controller';
import { AutoSailService } from 'src/modules/auto-sail/auto-sail.service';
import { AutoSailSchema } from 'src/modules/auto-sail/model/auto-sail.model';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { UserModule } from 'src/modules/users/user.module';
import { RedisProvider } from 'src/providers/redis.provider';

@Module({
  imports: [
    AuthModule,
    GuildModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'auto_sail', schema: AutoSailSchema }]),
  ],
  providers: [AutoSailService, RedisService, RedisProvider],
  controllers: [AutoSailController],
  exports: [],
})
export class AutoSailModule {}
