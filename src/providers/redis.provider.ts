import { Provider } from '@nestjs/common';
import { Redis } from 'ioredis';
import { PROVIDER_TYPES } from 'src/core/provider.types';

const redisClient = new Redis({
  host: 'kittychan-redis',
  db: Number(process.env.REDIS_DB),
  password: process.env.REDIS_PASS,
  port: Number(process.env.REDIS_PORT) || 6379,
  retryStrategy: () => {
    return null;
  },
});

export const RedisProvider: Provider = {
  provide: PROVIDER_TYPES.RedisClient,
  useValue: redisClient,
};
