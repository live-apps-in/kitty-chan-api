import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LanguageLibsDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public data: string[];

  @IsOptional()
  @IsString()
  public type: string;

  public guildId: string;
}
