import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schemas/event.schema';

/**
 * @description Database handler service for Event datamodel
 * @author Mannix Manglani
 * @date 18/01/2024
 * @export
 * @class EventsService
 */
@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  /**
   * @description Creates an Event
   * @author Mannix Manglani
   * @date 18/01/2024
   * @param {CreateEventDto} createEventDto
   * @returns {*}  {Promise<Event>}
   * @memberof EventsService
   */
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find();
  }

  async getEventsByDate(startDate: string, endDate?: string): Promise<Event[]> {
    const activeEvents = await this.eventModel.find({ isActive: true }).exec();
    const filteredEvents = activeEvents.filter((event: Event) => {
      return event.eventSchedule.some((schedule) => {
        // Convertir string a Date para comparación
        const scheduleStartDate = new Date(schedule.startDate);
        const scheduleEndDate = new Date(schedule.endDate);
        const queryStartDate = new Date(startDate);
        const queryEndDate = endDate ? new Date(endDate) : queryStartDate;

        // Verificar si el evento ocurre dentro del rango de fechas solicitado
        return (
          scheduleStartDate <= queryEndDate && scheduleEndDate >= queryStartDate
        );
        // TODO Esta es una simplificación; manejar 'repeatFrequency' y 'byDay' adecuadamente
      });
    });

    return filteredEvents;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  async findByUuid(uuid: string): Promise<Event | null> {
    return this.eventModel.findOne({ uuid }).exec();
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }

  async findActiveEvents(): Promise<Event[]> {
    return this.eventModel.find({ isActive: true }).exec();
  }
}
