import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class CommunityTemplates {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  userId: string;

  @Prop()
  guildId: string;

  @Prop()
  templateType: string;

  @Prop({ default: false })
  templateTarget: string;

  @Prop()
  templateId: Types.ObjectId;

  @Prop()
  tags: string[];

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const CommunityTemplatesSchema =
  SchemaFactory.createForClass(CommunityTemplates);
