import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsEnum,
  ValidateIf,
  IsObject,
  ValidateNested,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';
import { FeatureDefault } from 'src/common/dto/FeatureDefault.dto';
import { DiscordActions } from 'src/common/enum/discord-action.enum';
import { StrongLanguageCodes } from 'src/modules/language/enum/strong_language.enum';

class StrongLanguageTriggerAction {
  @IsNotEmpty()
  @IsEnum(DiscordActions)
  public action: DiscordActions;

  @IsNotEmpty()
  @ValidateIf((o) => o.action === DiscordActions.MESSAGE_REACT)
  public emoji: string;

  @IsNotEmpty()
  @ValidateIf((o) => o.action === DiscordActions.MESSAGE_REPLY)
  public plainMessage: string;
}

class StrongLanguageConfig {
  @IsNotEmpty()
  @IsEnum(StrongLanguageCodes)
  language: StrongLanguageCodes;

  @IsNotEmpty()
  @IsMongoId()
  whitelistLib: Types.ObjectId;
}

export class StrongLanguage extends FeatureDefault {
  @IsArray()
  @Type(() => StrongLanguageConfig)
  @ValidateNested()
  languageConfig: StrongLanguageConfig[];

  @IsNotEmpty()
  @IsObject()
  @Type(() => StrongLanguageTriggerAction)
  @ValidateNested()
  public actionConfig: StrongLanguageTriggerAction;
}
