import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Thing } from 'src/common/schemas/thing.schema';

@Schema()
export class Event extends Thing {
  @Prop()
  organizer: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
