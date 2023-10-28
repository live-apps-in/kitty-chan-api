import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ReactionRoles {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  messageId: string;

  @Prop()
  roleEmojiMapping: any[];

  @Prop({ type: Object })
  templateConfig: any;

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  createdAt: string;
}

export const ReactionRolesSchema = SchemaFactory.createForClass(ReactionRoles);
