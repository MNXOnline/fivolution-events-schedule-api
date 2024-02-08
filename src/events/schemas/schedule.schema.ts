import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Thing } from 'src/common/schemas/thing.schema';

@Schema()
export class Schedule extends Thing {
  @Prop({ default: () => new Date() })
  startDate: Date;

  @Prop({ default: () => new Date() })
  endDate: Date;

  @Prop()
  repeatFrequency: string; // Ejemplo: "P1W" para semanal

  @Prop()
  byDay: [string]; // Ejemplo: ["Mo", "We", "Fr"]

  @Prop()
  exceptDate: [Date];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
