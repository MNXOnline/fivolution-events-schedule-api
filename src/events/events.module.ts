import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';
import { ClientIdMiddleware } from 'src/common/schemas/middleware/client-id.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    EventsModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientIdMiddleware).forRoutes(EventsController);
  }
}
