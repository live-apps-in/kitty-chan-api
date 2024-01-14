import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CronService } from 'src/modules/cron/cron.service';
import { Cron, CronSchema } from 'src/modules/cron/model/cron.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cron.name, schema: CronSchema }]),
  ],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
