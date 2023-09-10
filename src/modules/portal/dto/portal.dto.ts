import { IsOptional, IsString } from 'class-validator';
import { FeatureDefault } from 'src/common/dto/FeatureDefault.dto';

export class PortalDto extends FeatureDefault {
  @IsOptional()
  @IsString()
  channelId: string;
}
