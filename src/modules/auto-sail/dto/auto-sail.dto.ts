import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AutoSailConfigDto } from 'src/modules/auto-sail/dto/auto-sail-config.dto';

export class AutoSailCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  guildId: string;
  userId: string;

  @Type(() => AutoSailConfigDto)
  @ValidateNested()
  @IsNotEmpty()
  config: AutoSailConfigDto;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
