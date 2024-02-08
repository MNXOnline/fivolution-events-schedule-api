import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schemas/event.schema';
import { generateSlug } from 'src/common/utils/slug.utils';
import { isUUID } from 'class-validator';

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
    const slug = await this.getEventSlug(createEventDto.name);
    const eventWithSlug = {
      ...createEventDto,
      slug, // Añade el slug único al DTO antes de crear el evento
    };
    const newEvent = new this.eventModel(eventWithSlug);
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

  async findByUuidOrSlug(uuidOrSlug: string) {
    if (isUUID(uuidOrSlug))
      return this.eventModel.findOne({ uuid: uuidOrSlug }).exec();
    else return this.eventModel.findOne({ slug: uuidOrSlug }).exec();
  }

  async update(uuidOrSlug: string, updateEventDto: UpdateEventDto) {
    const event = await this.findByUuidOrSlug(uuidOrSlug);

    if (!event) {
      throw new NotFoundException(`Evento ${uuidOrSlug} no encontrado`);
    }
    // Verifica si el nombre ha cambiado y, de ser así, genera un nuevo slug
    if (
      (!updateEventDto.slug || updateEventDto.slug === event.slug) &&
      updateEventDto.name !== event.name
    ) {
      const newSlug = await this.getEventSlug(updateEventDto.name);

      // Actualiza el slug del evento
      updateEventDto.slug = newSlug;
    }

    // TODO Revisar con @joel
    for (const [key, value] of Object.entries(updateEventDto)) {
      event[key] = value;
    }

    await event.save();
    return event;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }

  async findActiveEvents(): Promise<Event[]> {
    return this.eventModel.find({ isActive: true }).exec();
  }

  private async getEventSlug(eventName: string): Promise<string> {
    let slug = generateSlug(eventName);
    let existingEvent = await this.eventModel.findOne({ slug }).exec();
    let counter = 1;

    while (existingEvent) {
      const newSlug = `${slug}-${counter}`;
      existingEvent = await this.eventModel.findOne({ slug: newSlug }).exec();
      if (!existingEvent) {
        slug = newSlug; // Slug disponible encontrado
        break;
      }
      counter++;
    }

    return slug;
  }
}
