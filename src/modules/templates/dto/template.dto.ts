import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import {
  TemplateTarget,
  TemplateType,
} from 'src/modules/templates/interface/template.interface';

export class TemplateDto {
  @IsNotEmpty()
  @IsEnum(TemplateType)
  type: TemplateType;

  @IsNotEmpty()
  @IsEnum(TemplateTarget)
  target: TemplateTarget;

  @IsNotEmpty()
  @ValidateIf((o) => o.type === TemplateType.PLAIN)
  @IsString()
  content: string;

  @IsNotEmpty()
  @ValidateIf((o) => o.type === TemplateType.EMBED)
  @IsString()
  embed: string;
}
