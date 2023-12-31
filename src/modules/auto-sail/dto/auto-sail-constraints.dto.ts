import { IsEnum, IsOptional } from 'class-validator';
import { IValueCase } from 'src/common/interface/value-case.interface';
import { AutoSailConstraintsType } from 'src/modules/auto-sail/enum/auto-sail-constraints-type.enum';

export class AutoSailConstraintsDto {
  @IsEnum(AutoSailConstraintsType)
  type: AutoSailConstraintsType;

  @IsOptional()
  conditions: AutoSailConditionDto[];
}

interface AutoSailConditionDto {
  equal?: IValueCase;
  notEqual?: IValueCase;
  gt?: IValueCase;
  lt?: IValueCase;
}
