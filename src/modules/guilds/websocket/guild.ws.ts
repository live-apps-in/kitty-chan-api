import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Redis } from 'ioredis';
import { Socket } from 'socket.io';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { GuildUserActivityDto } from 'src/modules/guilds/dto/GuildWs.dto';

@WebSocketGateway()
export class GuildWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(PROVIDER_TYPES.RedisClient)
    private readonly redisClient: Redis,
  ) {}

  /**Handle Client Connect */
  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  /**Handle Client Disconnect */
  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  /**Guild User online */
  @SubscribeMessage('user_online')
  async userOnline(
    @MessageBody('guildId') guildId: string,
    @MessageBody('activityStatus') activityStatus: GuildUserActivityDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (client) {
      client.join(guildId);
    }

    const cacheKey = `ws-guild:${guildId}`;
    const usersActivityStatus: GuildUserActivityDto[] = JSON.parse(
      await this.redisClient.get(cacheKey),
    );

    if (!usersActivityStatus) {
      await this.redisClient.set(cacheKey, JSON.stringify([activityStatus]));
    } else {
      const userActivityIndex = usersActivityStatus.findIndex(
        (item) => item.userId === activityStatus.userId,
      );

      if (userActivityIndex !== -1) {
        // Replace the entire object
        usersActivityStatus[userActivityIndex] = activityStatus;
        await this.redisClient.set(
          cacheKey,
          JSON.stringify(usersActivityStatus),
        );
      }
    }

    client.to(guildId).emit('user_online', usersActivityStatus);
  }

  /**Guild User Activity Status Update */
  @SubscribeMessage('user_activity_status_update')
  async activityStatusUpdate(
    @MessageBody('guildId') guildId: string,
    @MessageBody('activityStatus') activityStatus: GuildUserActivityDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (client) {
      client.join(guildId);
    }

    const cacheKey = `ws-guild:${guildId}`;
    const usersActivityStatus: GuildUserActivityDto[] = JSON.parse(
      await this.redisClient.get(cacheKey),
    );

    if (!usersActivityStatus) {
      await this.redisClient.set(cacheKey, JSON.stringify([activityStatus]));
    } else {
      const userActivityIndex = usersActivityStatus.findIndex(
        (item) => item.userId === activityStatus.userId,
      );

      if (userActivityIndex !== -1) {
        // Replace the entire object
        usersActivityStatus[userActivityIndex] = activityStatus;
        await this.redisClient.set(
          cacheKey,
          JSON.stringify(usersActivityStatus),
        );
      }
    }
  }
}
