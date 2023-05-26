import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  discordId: string;

  @Prop({ type: Object })
  discord: any;

  @Prop({ type: [String] })
  guilds: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
