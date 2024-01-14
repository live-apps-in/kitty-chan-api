import { IsNotEmpty, IsString } from 'class-validator';

export class CronConfigDto {
  @IsString()
  @IsNotEmpty()
  expression: string;
}
