import {
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CronCreateDto } from 'src/modules/cron/dto/cron-create.dto';
import { ICronGRPCService } from 'src/proto/interface/cron.interface';

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

  async createCron({ _id, expression }: CronCreateDto) {
    await lastValueFrom(
      this.cronGRPCService.cronCreate({ id: _id, expression }),
    ).catch((err) => {
      console.log(err.message);
      throw new InternalServerErrorException('Unable to create cron job');
    });
  }
}
