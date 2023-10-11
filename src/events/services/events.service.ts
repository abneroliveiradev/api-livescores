import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async getLiveEvents(): Promise<Event[]> {
    return this.eventsRepository.find({
      where: {
        status: 'live',
      },
    });
  }

  async getScheduledEvents(event: CreateEventDto): Promise<Event> {
    const data = await this.eventsRepository.findOne({
      where: {
        status: 'scheduled',
        teamAId: event.teamAId,
        teamBId: event.teamBId,
        competitionId: event.competitionId,
        startTime: event.startTime,
      },
    });
    return data;
  }

  async getEventsByDate(date: string): Promise<Event[]> {
    return this.eventsRepository.find({
      where: {
        status: 'live',
      },
    });
  }

  async getFinishedEventsByDate(date: string): Promise<Event[]> {
    return this.eventsRepository.find({
      where: {
        status: 'live',
      },
    });
  }

  async createEvent(event: CreateEventDto): Promise<Event> {
    // Implementar a lógica para criar um evento
    const createdEvent = this.eventsRepository.create(event);
    // Certificar-se de atribuir IDs únicos aos eventos
    // this.eventGateway.server.emit('liveEvents', event);
    return createdEvent;
  }
}
