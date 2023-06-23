import { Client } from '@live-apps/discord';
import { Provider } from '@nestjs/common';

const client = new Client({
  token: process.env.KITTY_CHAN_TOKEN,
  events: [],
  logs: false,
  redisOptions: {
    db: 0,
    host: process.env.REDIS_HOST,
    port: (process.env.REDIS_PORT as any) || 6379,
    pass: process.env.REDIS_PASS,
  },
});

export const DiscordProvider: Provider = {
  provide: 'LIVE_APPS_DISCORD',
  useValue: client,
};
