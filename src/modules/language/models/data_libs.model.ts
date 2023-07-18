import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DataLibs {
  @Prop()
  name: string;

  @Prop()
  data: string[];

  @Prop({ default: false })
  system: boolean;

  @Prop()
  guildId: string;
}

export const DataLibsSchema = SchemaFactory.createForClass(DataLibs);
