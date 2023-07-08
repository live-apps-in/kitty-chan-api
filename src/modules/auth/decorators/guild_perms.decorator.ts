import { SetMetadata } from '@nestjs/common';

export const PERMS_KEY = 'guild_perms';
export const Permissions = (...guildPerms: string[]) =>
  SetMetadata(PERMS_KEY, guildPerms);
