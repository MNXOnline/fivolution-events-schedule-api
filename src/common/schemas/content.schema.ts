// src/common/schemas/content.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Thing } from './thing.schema';

@Schema()
export class Content extends Thing {
  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  content: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
