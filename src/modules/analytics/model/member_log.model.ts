import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MemberLog {
  @Prop()
  userId: string;

  @Prop()
  guildId: string;

  @Prop()
  event: string;

  @Prop()
  createdAt: string;
}

export const MemberLogSchema = SchemaFactory.createForClass(MemberLog);
