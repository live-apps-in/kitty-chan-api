import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GuildAdminDto } from 'src/modules/guilds/dto/GuildAdmin.dto';

export type GuildDocument = HydratedDocument<Guild>;

@Schema()
export class Guild {
  @Prop()
  name: string;

  @Prop()
  guildId: string;

  @Prop()
  ownerId: string;

  @Prop()
  icon: string;

  @Prop({ type: Array<GuildAdminDto> })
  admins: GuildAdminDto[];

  @Prop({ type: Object })
  features: any;

  @Prop({ type: Object })
  portal: any;

  @Prop({ type: Number })
  messageCount: number;
}

export const GuildSchema = SchemaFactory.createForClass(Guild);
