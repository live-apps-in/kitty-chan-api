import { DiscordEmbeds } from '@live-apps/discord';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Types } from 'mongoose';
import {
  TemplateTarget,
  TemplateType,
} from 'src/modules/templates/enum/template.interface';

export class TemplateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsEnum(TemplateType)
  type: TemplateType;

  @IsNotEmpty()
  @IsEnum(TemplateTarget)
  target: TemplateTarget;

  @IsNotEmpty()
  @ValidateIf((o) => o.type === TemplateType.PLAIN)
  @IsString()
  content: string;

  @IsNotEmpty()
  @ValidateIf((o) => o.type === TemplateType.EMBED)
  @Type(() => Object)
  embed: DiscordEmbeds;

  guildId: string;

  userId: string;

  community: boolean;

  forkedFrom: Types.ObjectId;
}
