import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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

  findOne(id: number) {
    return `This action returns a #${id} event`;
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
