import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ReactionRolesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @Type(() => ReactionRolesRoleEmojiMapping)
  @ValidateNested()
  @ArrayNotEmpty()
  @IsNotEmpty()
  roleEmojiMapping: ReactionRolesRoleEmojiMapping[];

  @IsString()
  @IsNotEmpty()
  channelId: string;

  @IsString()
  @IsNotEmpty()
  templateId: string;

  @IsBoolean()
  @IsOptional()
  isActive: string;
}

class ReactionRolesRoleEmojiMapping {
  @IsObject()
  @IsNotEmpty()
  emoji: any;

  @IsString()
  @IsNotEmpty()
  roleId: string;
}
