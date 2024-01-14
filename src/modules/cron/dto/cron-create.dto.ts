import { CronModuleTypes } from 'src/modules/cron/enum/cron-modules.enum';

export interface CronCreateDto {
  _id?: string;
  module: CronModuleTypes;
  expression: string;
}
