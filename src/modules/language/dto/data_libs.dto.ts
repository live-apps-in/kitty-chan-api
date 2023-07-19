import { ArrayNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class DataLibsDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public data: string[];

  public guildId: string;
}
