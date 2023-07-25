import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LanguageFilter } from 'src/modules/language/dto/language_filter.dto';
import { StrongLanguage } from 'src/modules/language/dto/strong_language.dto';

export class LanguageDto {
  @IsNotEmpty()
  @Type(() => StrongLanguage)
  @ValidateNested()
  public strongLanguage: StrongLanguage;

  @IsNotEmpty()
  @Type(() => LanguageFilter)
  @ValidateNested()
  public languageFilter: LanguageFilter;
}
