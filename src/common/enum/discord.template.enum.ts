export enum DiscordTemplateType {
  PLAIN = 'plain',
  EMBED = 'embed',
}

export enum DiscordTemplateTarget {
  /**Welcome/Leave */
  WELCOME_MESSAGE = 'welcomeMessage',

  /**Logs */
  messageUpdate = 'messageUpdate',
  messageDelete = 'messageDelete',

  /**Member */
  memberNicknameUpdate = 'memberNicknameUpdate',
  memberUsernameUpdate = 'memberUsernameUpdate',
  memberAvatarUpdate = 'memberAvatarUpdate',
  memberAddRole = 'memberAddRole',
  memberRemoveRole = 'memberRemoveRole',

  /**Role */
  reactionRoles = 'reactionRoels',
}
