import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class GuildRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsObject()
  permissions: any;

  @IsNotEmpty()
  @IsString()
  guildId: string;

  systemRole: boolean;
}
