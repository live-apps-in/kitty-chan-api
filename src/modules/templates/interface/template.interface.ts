export enum TemplateType {
  PLAIN = 'plain',
  EMBED = 'embed',
}

export enum TemplateTarget {
  /**Welcome/Leave */
  welcomeMessage = 'welcomeMessage',

  /**Logs */
  messageUpdate = 'messageUpdate',
  messageDelete = 'messageDelete',

  /**Member */
  memberNicknameUpdate = 'memberNicknameUpdate',
  memberUsernameUpdate = 'memberUsernameUpdate',
  memberAvatarUpdate = 'memberAvatarUpdate',
  memberAddRole = 'memberAddRole',
  memberRemoveRole = 'memberRemoveRole',
}
