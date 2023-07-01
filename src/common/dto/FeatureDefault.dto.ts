import { IsBoolean, IsOptional, IsString } from 'class-validator';

/**Fundamental fields for Features */
export class FeatureDefault {
  @IsOptional()
  @IsBoolean()
  public isActive: boolean;
}

/**Features which has access to Message templates */
export class FeatDefaultWithTemplates extends FeatureDefault {
  @IsOptional()
  @IsString()
  public channelId: string;

  @IsOptional()
  @IsString()
  public templateId: string;
}
