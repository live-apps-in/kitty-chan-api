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
import { DiscordActions } from 'src/common/enum/discord-action.enum';

class LanguageFilterTriggerAction {
  @IsNotEmpty()
  @IsEnum(DiscordActions)
  public action: DiscordActions;

  @IsNotEmpty()
  @ValidateIf((o) => o.action === DiscordActions.MESSAGE_REACT)
  public reactEmoji: string;

  @IsNotEmpty()
  @ValidateIf((o) => o.action === DiscordActions.MESSAGE_REACT)
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
