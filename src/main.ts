import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RedisIoAdapter } from 'src/common/adaptors/redis.adaptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  /** Express app config */
  app.enableCors();

  /**Validation */
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
