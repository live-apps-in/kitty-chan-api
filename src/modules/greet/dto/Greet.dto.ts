import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FeatDefaultWithTemplates } from 'src/common/dto/FeatureDefault.dto';

export class GreetDto {
  @IsOptional()
  @IsBoolean()
  public isActive: boolean;

  @IsOptional()
  @Type(() => FeatDefaultWithTemplates)
  @ValidateNested()
  public welcome: FeatDefaultWithTemplates;

  @IsOptional()
  @Type(() => FeatDefaultWithTemplates)
  @ValidateNested()
  public farewell: FeatDefaultWithTemplates;
}
