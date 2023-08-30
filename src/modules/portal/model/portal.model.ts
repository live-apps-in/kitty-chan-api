import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Portal {
  @Prop()
  guildId: string;

  @Prop()
  guildName: string;
}

export const PortalSchema = SchemaFactory.createForClass(Portal);
