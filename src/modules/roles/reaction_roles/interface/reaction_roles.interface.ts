export class IReactionRoles {
  name: string;
  description: string;
  guildId: string;
  userId: string;
  roleEmojiMapping: IReactionRolesRoleEmojiMapping[];
  templateId: string;
  isActive: string;
  createdAt?: Date;
}

interface IReactionRolesRoleEmojiMapping {
  emojiType: string;
  emoji: string;
  roleId: string;
}
