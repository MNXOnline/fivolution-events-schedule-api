// src/common/schemas/organization.schema.ts

import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Thing } from './thing.schema';

@Schema()
export class Organization extends Thing {
  // ...campos específicos de Organization...
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
