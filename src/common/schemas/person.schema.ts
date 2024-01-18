// src/common/schemas/person.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Thing } from './thing.schema';

@Schema()
export class Person extends Thing {
  @Prop({ required: true, unique: true, match: /.+\@.+\..+/ })
  email: string;

  // ...otros campos específicos de Person...
}

export const PersonSchema = SchemaFactory.createForClass(Person);
