import * as grpc from '@grpc/grpc-js';
import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

/**kitty chan Domain gRPC client config */
export const kittyChangRPCOptions: ClientsModuleOptions = [
  {
    name: 'kitty_chan_grpc',
    transport: Transport.GRPC,
    options: {
      package: 'kitty_chan',
      protoPath: join(__dirname, '../proto/kitty_chan.proto'),
      url: process.env.KITTY_CHAN_GRPC_URL,
      credentials: grpc.credentials.createInsecure(),
    },
  },
];
