import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { GreetDto } from 'src/modules/greet/dto/Greet.dto';
import { LanguageDto } from 'src/modules/language/dto/language.dto';
import { PortalDto } from 'src/modules/portal/dto/portal.dto';

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

  @Prop({ type: LanguageDto, default: { isActive: false } })
  language: LanguageDto;

  @Prop({ type: PortalDto, default: { isActive: false } })
  portal: PortalDto;
}

export const FeaturesSchema = SchemaFactory.createForClass(Features);
