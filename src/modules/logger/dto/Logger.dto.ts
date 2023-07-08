import { IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FeatDefaultWithTemplates } from 'src/common/dto/FeatureDefault.dto';

export class LoggerDto {
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;

  @IsNotEmpty()
  @Type(() => FeatDefaultWithTemplates)
  @ValidateNested()
  public messageUpdate: FeatDefaultWithTemplates;

  @IsNotEmpty()
  @Type(() => FeatDefaultWithTemplates)
  @ValidateNested()
  public messageDelete: FeatDefaultWithTemplates;

  @IsNotEmpty()
  @Type(() => FeatDefaultWithTemplates)
  @ValidateNested()
  public memberAddRole: FeatDefaultWithTemplates;

  @IsNotEmpty()
  @Type(() => FeatDefaultWithTemplates)
  @ValidateNested()
  public memberRemoveRole: FeatDefaultWithTemplates;

  @IsOptional()
  @Type(() => FeatDefaultWithTemplates)
  @ValidateNested()
  public memberNicknameUpdate: FeatDefaultWithTemplates;

  @IsNotEmpty()
  @Type(() => FeatDefaultWithTemplates)
  @ValidateNested()
  public memberUsernameUpdate: FeatDefaultWithTemplates;

  @IsNotEmpty()
  @Type(() => FeatDefaultWithTemplates)
  @ValidateNested()
  public memberAvatarUpdate: FeatDefaultWithTemplates;
}
