import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class GuildUserActivityDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  page: string;
}
