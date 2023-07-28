import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  ValidateNested,
  ArrayNotEmpty,
  IsEnum,
  ValidateIf,
  IsObject,
} from 'class-validator';
import { FeatureDefault } from 'src/common/dto/FeatureDefault.dto';
import { LanguageFilterAction } from 'src/modules/language/enum/lang_filter.enum';

class LanguageFilterTriggerAction {
  @IsNotEmpty()
  @IsEnum(LanguageFilterAction)
  public action: LanguageFilterAction;

  @IsNotEmpty()
  @ValidateIf((o) => o.action === LanguageFilterAction.REACT)
  public reactEmoji: string;

  @IsNotEmpty()
  @ValidateIf((o) => o.action === LanguageFilterAction.REPLY)
  public replyMessage: string;
}

class LanguageFilterConfig {
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;

  @IsNotEmpty()
  @IsString()
  public languageLibId: string;

  @IsNotEmpty()
  @IsObject()
  @Type(() => LanguageFilterTriggerAction)
  @ValidateNested()
  public actionConfig: LanguageFilterTriggerAction;
}

export class LanguageFilter extends FeatureDefault {
  @IsNotEmpty()
  @ArrayNotEmpty()
  @Type(() => LanguageFilterConfig)
  @ValidateNested()
  public languageFilterConfig: LanguageFilterConfig[];
}
