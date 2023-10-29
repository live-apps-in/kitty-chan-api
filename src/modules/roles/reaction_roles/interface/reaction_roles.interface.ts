export class IReactionRoles {
  name: string;
  description: string;
  guildId: string;
  channelId: string;
  messageId?: string;
  userId?: string;
  roleEmojiMapping: IReactionRolesRoleEmojiMapping[];
  templateId: string;
  isActive: string;
  createdAt?: Date;
}

interface IReactionRolesRoleEmojiMapping {
  emoji: any;
  roleId: string;
}
