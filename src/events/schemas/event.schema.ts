import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Thing } from 'src/common/schemas/thing.schema';

@Schema()
export class Event extends Thing {
  @Prop()
  organizer: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Boolean, default: false })
  isSPromoted: boolean;

  // TODO Evaluate a more complex structure for isActive and isPromoted
}

export const EventSchema = SchemaFactory.createForClass(Event);
