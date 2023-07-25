import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsEnum,
  ValidateIf,
  IsObject,
  ValidateNested,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import { FeatureDefault } from 'src/common/dto/FeatureDefault.dto';
import { LanguageFilterAction } from 'src/modules/language/enum/lang_filter.enum';
import { StrongLanguageCodes } from 'src/modules/language/enum/strong_language.enum';

class StrongLanguageTriggerAction {
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

export class StrongLanguage extends FeatureDefault {
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(StrongLanguageCodes, { each: true })
  languages: StrongLanguageCodes[];

  @IsNotEmpty()
  @IsObject()
  @Type(() => StrongLanguageTriggerAction)
  @ValidateNested()
  public actionConfig: StrongLanguageTriggerAction;
}
