import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidateNested,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import { FeatureDefault } from 'src/common/dto/FeatureDefault.dto';
import { ActionConfigDto } from 'src/common/dto/action-config.dto';

class LanguageFilterConfig {
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;

  @IsNotEmpty()
  @IsString()
  public languageLibId: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => ActionConfigDto)
  @ValidateNested()
  public actionConfig: ActionConfigDto;
}

export class LanguageFilter extends FeatureDefault {
  @IsNotEmpty()
  @ArrayNotEmpty()
  @Type(() => LanguageFilterConfig)
  @ValidateNested()
  public languageFilterConfig: LanguageFilterConfig[];
}
