import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class AuthSession {
  @Prop({ ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  discordAccessToken: string;

  @Prop()
  sessionId: string;

  @Prop({ default: new Date(), index: { expireAfterSeconds: 604800 } })
  createdAt: Date;
}

export const AuthSessionSchema = SchemaFactory.createForClass(AuthSession);
