import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DiscordActionTypes } from 'src/common/enum/discord-action.enum';

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
  @IsEnum(DiscordActionTypes)
  action: DiscordActionTypes;

  @IsOptional()
  messageConfig: ActionMessageConfig;
}
