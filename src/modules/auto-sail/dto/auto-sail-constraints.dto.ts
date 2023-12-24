import { IsEnum, IsOptional } from 'class-validator';
import { IValueCase } from 'src/common/interface/value-case.interface';
import { AutoSailConstraintsType } from 'src/modules/auto-sail/enum/auto-sail-constraints-type.enum';

export class AutoSailConstraintsDto {
  @IsEnum(AutoSailConstraintsType)
  type: AutoSailConstraintsType;

  @IsOptional()
  conditions: AutoSailConditionDTO[];
}

interface MessageConditionDTO {
  equals?: IValueCase;
  notEquals?: IValueCase;
}

interface TimeConditionDTO {
  equals?: IValueCase;
  greaterThan?: IValueCase;
  lessThan?: IValueCase;
}

type AutoSailConditionDTO = MessageConditionDTO | TimeConditionDTO;
