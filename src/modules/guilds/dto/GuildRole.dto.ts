import { ArrayNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class GuildRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsString({ each: true })
  permissions: string[];

  @IsNotEmpty()
  @IsString()
  guildId: string;

  systemRole: boolean;
}
