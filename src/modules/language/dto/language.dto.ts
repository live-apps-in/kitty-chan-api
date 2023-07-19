import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FeatureDefault } from 'src/common/dto/FeatureDefault.dto';
import { LanguageFilter } from 'src/modules/language/dto/language_filter.dto';

export class LanguageDto {
  @IsNotEmpty()
  @Type(() => FeatureDefault)
  @ValidateNested()
  public strongLanguage: FeatureDefault;

  @IsNotEmpty()
  @Type(() => LanguageFilter)
  @ValidateNested()
  public languageFilter: LanguageFilter;
}
