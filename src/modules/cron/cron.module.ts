import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { kittyChangRPCOptions } from 'src/microservice/gRPC';
import { CronGRPCService } from 'src/modules/cron/cron-gRPC.service';
import { CronService } from 'src/modules/cron/cron.service';
import { Cron, CronSchema } from 'src/modules/cron/model/cron.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cron.name, schema: CronSchema }]),
    ClientsModule.register(kittyChangRPCOptions),
  ],
  providers: [CronService, CronGRPCService],
  exports: [CronService],
})
export class CronModule {}
