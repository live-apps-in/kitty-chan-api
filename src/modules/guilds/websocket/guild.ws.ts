import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class GuildWsGateway {
  @SubscribeMessage('userOnline')
  async userOnline(@MessageBody() data: string) {
    console.log(data);
    return { name: 'jaga' };
  }
}
