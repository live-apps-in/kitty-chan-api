import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class GuildUserActivityDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  sessionId: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  page: string;
}
