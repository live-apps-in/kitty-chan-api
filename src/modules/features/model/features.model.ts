import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { GreetDto } from 'src/modules/greet/dto/Greet.dto';

const featureDefaultPerms = {
  isActive: false,
  channelId: null,
  templateId: null,
};

@Schema()
export class Features {
  @Prop({
    unique: true,
  })
  guildId: Types.ObjectId;

  @Prop({ type: Object, default: featureDefaultPerms })
  logger: any;

  @Prop({ type: GreetDto, default: featureDefaultPerms })
  greet: GreetDto;
}

export const FeaturesSchema = SchemaFactory.createForClass(Features);
