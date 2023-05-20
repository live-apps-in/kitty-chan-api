import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ ref: 'users' })
  userId: Types.ObjectId;

  @Prop({ type: Array<any> })
  sessions: any[];
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
