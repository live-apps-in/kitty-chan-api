import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/common/enum/roles.enum';

export const ROLES_KEY = 'roles';
export const GuildRoles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);
