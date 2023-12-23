import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { AutoSailActionEvents } from 'src/modules/auto-sail/enum/auto-sail-action.enum';

class ActionMessageCreateConfig {
  @IsString()
  channelId: string;

  @IsString()
  messageType: string;

  @IsString()
  plainMessage: string;

  embed: any;
}

class ActionMessageReactConfig {
  @IsString()
  emoji: string;
}

class ActionMessageReplyConfig {
  @IsString()
  message: string;
}

export class ActionConfigDto {
  @IsEnum(AutoSailActionEvents)
  action: AutoSailActionEvents;

  @Type(() => ActionMessageCreateConfig)
  @ValidateIf((obj) => obj.action === AutoSailActionEvents.MESSAGE_CREATE)
  @ValidateNested()
  @IsNotEmpty()
  messageCreateConfig: ActionMessageCreateConfig;

  @Type(() => ActionMessageReplyConfig)
  @ValidateIf((obj) => obj.action === AutoSailActionEvents.MESSAGE_REPLY)
  @ValidateNested()
  @IsNotEmpty()
  messageReplyConfig: ActionMessageReplyConfig;

  @Type(() => ActionMessageReactConfig)
  @ValidateIf((obj) => obj.action === AutoSailActionEvents.MESSAGE_REACT)
  @ValidateNested()
  @IsNotEmpty()
  messageReactConfig: ActionMessageReactConfig;
}
