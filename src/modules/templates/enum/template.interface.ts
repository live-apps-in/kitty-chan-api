export enum TemplateType {
  PLAIN = 'plain',
  EMBED = 'embed',
}

export enum TemplateSrc {
  DEFAULT = 'default',
  CUSTOM = 'custom',
}

export enum TemplateTarget {
  /**Greet */
  welcomeMessage = 'welcomeMessage',
  welcome = 'welcome',
  farewell = 'farewell',

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
