import { IsNotEmpty } from 'class-validator';

export class GuildAdminDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  roleId: string;

  @IsNotEmpty()
  isActive: boolean;
}
