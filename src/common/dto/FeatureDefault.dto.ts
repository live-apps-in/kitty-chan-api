import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**Fundamental fields for Features */
export class FeatureDefault {
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;
}

/**Features which has access to Message templates */
export class FeatDefaultWithTemplates extends FeatureDefault {
  @IsNotEmpty()
  @IsString()
  public channelId: string;

  @IsNotEmpty()
  @IsString()
  public templateId: string;
}
