import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  ICronCreateGRPC,
  ICronGRPCService,
} from 'src/proto/interface/cron.interface';

@Injectable()
export class CronGRPCService implements OnModuleInit {
  private cronGRPCService: ICronGRPCService;

  constructor(
    @Inject('kitty_chan_grpc') private readonly kittyChanGrpc: ClientGrpc,
  ) {}

  onModuleInit() {
    this.cronGRPCService =
      this.kittyChanGrpc.getService<ICronGRPCService>('CronService');
  }

  async createCron(cronCreateGRPCDto: ICronCreateGRPC) {
    await lastValueFrom(
      this.cronGRPCService.cronCreate(cronCreateGRPCDto),
    ).catch((err) => {
      console.log(err.message);

      throw new InternalServerErrorException('Unable to create cron job');
    });
  }

  async updateCron(cronCreateGRPCDto: ICronCreateGRPC) {
    await lastValueFrom(
      this.cronGRPCService.cronUpdate(cronCreateGRPCDto),
    ).catch((err) => {
      console.log(err.message);

      throw new InternalServerErrorException('Unable to update cron job');
    });
  }

  async deleteCron(cronCreateGRPCDto: ICronCreateGRPC) {
    await lastValueFrom(
      this.cronGRPCService.cronDelete(cronCreateGRPCDto),
    ).catch((err) => {
      console.log(err.message);

      throw new InternalServerErrorException('Unable to delete cron job');
    });
  }
}
