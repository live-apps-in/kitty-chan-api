import { Type } from 'class-transformer';
import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import { ActionConfigDto } from 'src/common/dto/action-config.dto';
import { AutoSailConstraintsDto } from 'src/modules/auto-sail/dto/auto-sail-constraints.dto';
import { AutoSailTriggerEvents } from 'src/modules/auto-sail/enum/auto-sail-trigger-events.enum';

export class AutoSailConfigDto {
  @IsEnum(AutoSailTriggerEvents)
  triggerEvent: AutoSailTriggerEvents;

  @IsArray()
  @Type(() => AutoSailConstraintsDto)
  @ValidateNested()
  constraints: AutoSailConstraintsDto[];

  @IsArray()
  @Type(() => ActionConfigDto)
  @ValidateNested()
  actionConfig: ActionConfigDto[];
}
