import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AutoSailActionEvents } from 'src/modules/auto-sail/enum/auto-sail-action.enum';

class ActionMessageCreateConfig {
  @IsString()
  @IsOptional()
  channelId: string;

  @IsString()
  @IsOptional()
  messageType: string;

  @IsString()
  @IsOptional()
  plainMessage: string;

  embed: any;
}

class ActionMessageReactConfig {
  @IsString()
  @IsOptional()
  emoji: string;
}

class ActionMessageReplyConfig {
  @IsString()
  @IsOptional()
  message: string;
}

type ActionMessageConfig =
  | ActionMessageCreateConfig
  | ActionMessageReactConfig
  | ActionMessageReplyConfig;

export class ActionConfigDto {
  @IsEnum(AutoSailActionEvents)
  action: AutoSailActionEvents;

  @IsNotEmpty()
  messageConfig: ActionMessageConfig;
}
