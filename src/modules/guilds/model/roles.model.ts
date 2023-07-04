import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Roles {
  @Prop()
  name: string;

  @Prop({ type: Object })
  permissions: any;

  @Prop()
  guildId: string;

  @Prop({ default: false })
  systemRole: boolean;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
