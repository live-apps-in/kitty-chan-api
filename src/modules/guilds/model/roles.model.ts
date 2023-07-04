import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Roles {
  @Prop()
  name: string;

  @Prop()
  permissions: any;

  @Prop()
  guildId: string;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
