import { Provider } from '@nestjs/common';
import { Redis } from 'ioredis';
import { PROVIDER_TYPES } from 'src/core/provider.types';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  db: 1,
  password: process.env.REDIS_PASS,
  port: 6379,
  retryStrategy: () => {
    return null;
  },
});

export const RedisProvider: Provider = {
  provide: PROVIDER_TYPES.RedisClient,
  useValue: redisClient,
};
