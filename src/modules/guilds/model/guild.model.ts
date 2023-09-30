import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GuildStaffDto } from 'src/modules/guilds/dto/GuildStaff.dto';

@Schema()
export class Guild {
  @Prop()
  name: string;

  @Prop()
  guildId: string;

  @Prop()
  ownerId: string;

  @Prop({ type: Array<GuildStaffDto>, default: [] })
  staffs: GuildStaffDto[];

  @Prop()
  icon: string;

  @Prop()
  tags: string[];
}

export const GuildSchema = SchemaFactory.createForClass(Guild);
