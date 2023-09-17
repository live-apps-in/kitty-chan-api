import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { GuildUserActivityDto } from 'src/modules/guilds/dto/GuildWs.dto';

@WebSocketGateway()
export class GuildWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private rooms: any = {};

  /**Handle Client Connect */
  handleConnection() {
    return;
  }

  /**Handle Client Disconnect */
  handleDisconnect(@ConnectedSocket() client: Socket) {
    if (this.rooms[client.id]) {
      this.rooms[client.id].forEach((room) => {
        client.to(room).emit('user_disconnect', { sessionId: client.id });
      });

      delete this.rooms[client.id];
    }
  }

  @SubscribeMessage('activity_status')
  async activityStatus(
    @MessageBody('guildId') guildId: string,
    @MessageBody('activityStatus') activityStatus: GuildUserActivityDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(guildId);

    if (!this.rooms[client.id]) {
      this.rooms[client.id] = [];
    }
    this.rooms[client.id].push(guildId);

    activityStatus.sessionId = client.id;
    client.in(guildId).emit('activity_status', activityStatus);
  }
}
