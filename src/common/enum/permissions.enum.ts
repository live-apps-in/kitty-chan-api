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

  //Welcome
  welcomeRead = 'greet:welcome:read',
  welcomeWrite = 'greet:welcome:write',
  welcomeDelete = 'greet:welcome:delete',

  //Farewell
  farewellRead = 'greet:farewell:read',
  farewellWrite = 'greet:farewell:write',
  farewellDelete = 'greet:farewell:delete',
}

export enum LOGGER_PERMS {
  read = 'logger:read',
  write = 'logger:write',

  //Message Update
  messageUpdateRead = 'logger:welcome:read',
  messageUpdateWrite = 'logger:welcome:write',
  messageUpdateDelete = 'logger:welcome:delete',

  //Message Delete
  messageDeleteRead = 'logger:messageDelete:read',
  messageDeleteWrite = 'logger:messageDelete:write',
  messageDeleteDelete = 'logger:messageDelete:delete',

  //Member Nickname update
  memberNicknameUpdateRead = 'logger:memberNicknameUpdate:read',
  memberNicknameUpdateWrite = 'logger:memberNicknameUpdate:write',
  memberNicknameUpdateDelete = 'logger:memberNicknameUpdate:delete',

  //Member Username update
  memberUsernameUpdateRead = 'logger:memberUsernameUpdate:read',
  memberUsernameUpdateWrite = 'logger:memberUsernameUpdate:write',
  memberUsernameUpdateDelete = 'logger:memberUsernameUpdate:delete',

  //Member Avatar update
  memberAvatarUpdateRead = 'logger:memberAvatarUpdate:read',
  memberAvatarUpdateWrite = 'logger:memberAvatarUpdate:write',
  memberAvatarUpdateDelete = 'logger:memberAvatarUpdate:delete',
}

/**Portal */
export enum PORTAL_PERMS {
  read = 'portal:read',
  write = 'portal:write',
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
  ...LOGGER_PERMS,
  ...TEMPLATE_PERMS,
  ...PORTAL_PERMS,
};
