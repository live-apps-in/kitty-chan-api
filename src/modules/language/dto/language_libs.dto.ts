import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { LangLibsEnum } from 'src/modules/language/enum/lang_lib_types.enum';

export class LanguageLibsDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public data: string[];

  @IsOptional()
  @IsEnum(LangLibsEnum)
  public type: LangLibsEnum;

  public guildId: string;
}
