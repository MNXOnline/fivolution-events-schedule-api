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

  create(createEventDto: CreateEventDto) {
    const newExhibitor = new this.eventModel(createEventDto);
    return newExhibitor.save();
  }

  findAll() {
    return `This action returns all events`;
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
