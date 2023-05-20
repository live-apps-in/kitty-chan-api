import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
