import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Headers,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createEventDto: CreateEventDto): Promise<any> {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @HttpCode(200)
  getEventsByDate(
    @Headers('start-date') startDate: string,
    @Headers('end-date') endDate?: string, // Opcional, para soportar rangos de fechas
  ) {
    if (startDate)
      return this.eventsService.getEventsByDate(startDate, endDate);
    else return this.eventsService.findAll();
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('active')
  @HttpCode(200)
  findAllActive() {
    return this.eventsService.findActiveEvents();
  }

  @Get(':uuidorslug')
  @HttpCode(200)
  findByUuidOrSlug(@Param('uuidorslug') uuidOrSlug: string) {
    return this.eventsService.findByUuidOrSlug(uuidOrSlug);
  }

  @Patch(':uuidorslug')
  @HttpCode(200)
  update(
    @Param('uuidorslug') uuidOrSlug: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(uuidOrSlug, updateEventDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
