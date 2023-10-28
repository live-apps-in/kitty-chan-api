import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsNotEmpty,
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
  templateId: string;

  @IsBoolean()
  @IsOptional()
  isActive: string;
}

class ReactionRolesRoleEmojiMapping {
  @IsString()
  @IsNotEmpty()
  emojiType: string;

  @IsString()
  @IsNotEmpty()
  emoji: string;

  @IsString()
  @IsNotEmpty()
  roleId: string;
}
