// src/common/schemas/image.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Thing } from './thing.schema';

@Schema()
export class Image extends Thing {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
