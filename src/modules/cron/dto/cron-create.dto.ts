import { CronModuleTypes } from 'src/modules/cron/enum/cron-modules.enum';

export class CronCreateDto {
  module: CronModuleTypes;
  expression: string;
}
