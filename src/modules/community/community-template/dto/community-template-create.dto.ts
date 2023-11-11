import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommunityTemplateCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  guildId: string;

  @IsString()
  @IsNotEmpty()
  templateId: string;

  @IsString({ each: true })
  @IsOptional()
  tags: string[] = [];

  templateType: string;
  templateTarget: string;
}
