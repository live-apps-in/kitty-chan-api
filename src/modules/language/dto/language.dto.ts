import { IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FeatureDefault } from 'src/common/dto/FeatureDefault.dto';

export class LanguageDto {
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;

  @IsNotEmpty()
  @Type(() => FeatureDefault)
  @ValidateNested()
  public strongLanguage: FeatureDefault;
}
