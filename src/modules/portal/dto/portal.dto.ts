import {
  ArrayNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { FeatureDefault } from 'src/common/dto/FeatureDefault.dto';

/**Portal Config */
export class PortalDto extends FeatureDefault {
  @IsOptional()
  @IsString()
  channelId: string;
}

/**Portal Room */
export class PortalRoomDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  description: string;

  @IsOptional()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];
}
