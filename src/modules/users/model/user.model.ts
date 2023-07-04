import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
