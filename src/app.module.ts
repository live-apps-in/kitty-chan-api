import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GuildModule } from 'src/modules/guilds/guild.module';
import { GreetModule } from 'src/modules/greet/greet.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    GuildModule,
    GreetModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
