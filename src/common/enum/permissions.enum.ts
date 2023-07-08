/**Permissions for all features */

/**Dashboard */
export enum DASHBOARD_PERMS {
  read = 'dashboard:read',
  write = 'dashboard:write',
}

/**Greet */
export enum GREET_PERMS {
  read = 'greet:read',
  write = 'greet:write',
  welcomeRead = 'greet:welcome:read',
  welcomeWrite = 'greet:welcome:write',
  welcomeDelete = 'greet:welcome:delete',
  farewellRead = 'greet:farewell:read',
  farewellWrite = 'greet:farewell:write',
  farewellDelete = 'greet:farewell:delete',
}

/**Discord Template */
export enum TEMPLATE_PERMS {
  read = 'template:read',
  write = 'template:write',
  delete = 'template:delete',
}

export const GUILD_PERMS = {
  ...DASHBOARD_PERMS,
  ...GREET_PERMS,
  ...TEMPLATE_PERMS,
};
