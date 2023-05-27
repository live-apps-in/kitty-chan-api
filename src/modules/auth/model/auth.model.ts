import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  discordAccessToken: string;

  @Prop({ type: Array<any> })
  sessions: any[];
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
