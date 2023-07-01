import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Template {
  @Prop()
  type: string;

  @Prop()
  target: string;

  @Prop()
  guildId: Types.ObjectId;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
