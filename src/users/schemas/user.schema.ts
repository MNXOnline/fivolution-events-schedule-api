// src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Person } from '../../common/schemas/person.schema';
import * as bcrypt from 'bcrypt';

@Schema()
export class User extends Person {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Exhibitor' }] })
  exhibitors: Types.ObjectId[];

  // ...otros campos si los hay...
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User & Document>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
