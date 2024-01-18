// src/common/schemas/validationInfo.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Thing } from './thing.schema';
import mongoose from 'mongoose';

@Schema()
export class ValidationInfo extends Thing {
  @Prop({ default: false })
  isValidated: boolean;

  @Prop()
  validatedById: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, enum: ['User', 'System'] })
  validatedByType: string;

  @Prop()
  comments: string;

  // ...otros campos...
}

export const ValidationInfoSchema =
  SchemaFactory.createForClass(ValidationInfo);
