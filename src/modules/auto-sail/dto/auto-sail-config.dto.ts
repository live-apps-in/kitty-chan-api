import { Type } from 'class-transformer';
import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import { ActionConfigDto } from 'src/common/dto/action-config.dto';
import { AutoSailConstraintsDto } from 'src/modules/auto-sail/dto/auto-sail-constraints.dto';
import { AutoSailTriggerType } from 'src/modules/auto-sail/enum/auto-sail-trigger-type.enum';

export class AutoSailConfigDto {
  @IsEnum(AutoSailTriggerType)
  trigger: AutoSailTriggerType;

  @IsArray()
  @Type(() => AutoSailConstraintsDto)
  @ValidateNested()
  constraints: AutoSailConstraintsDto[];

  @IsArray()
  @Type(() => ActionConfigDto)
  @ValidateNested()
  actionConfig: ActionConfigDto[];
}
