import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PortalRoom {
  @Prop()
  guildId: string;

  @Prop()
  guildName: string;

  @Prop()
  description: string;

  @Prop()
  tags: string[];

  @Prop()
  guilds: any[];

  @Prop()
  createdBy: string;
}

export const PortalRoomSchema = SchemaFactory.createForClass(PortalRoom);
