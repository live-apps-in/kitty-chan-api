import { ArrayNotEmpty, IsOptional } from 'class-validator';

export class GuildUpdateDto {
  @IsOptional()
  @ArrayNotEmpty()
  tags: string[];
}
