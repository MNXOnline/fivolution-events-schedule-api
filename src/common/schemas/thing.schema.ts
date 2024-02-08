import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

/**
 * @description Base datamodel for schemas based on schema.org's Thing
 * @author Mannix Manglani
 * @date 17/01/2024
 * @export
 * @class Thing
 */
@Schema()
export class Thing {
  @Prop({ default: () => uuidv4(), unique: true })
  uuid: string;

  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  description: string;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ default: () => new Date() })
  modifiedAt: Date;

  // ...otros campos comunes si los hay...
}

export const ThingSchema = SchemaFactory.createForClass(Thing);
