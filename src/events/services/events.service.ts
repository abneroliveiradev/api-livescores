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

  async checkScheduledEvent(event: CreateEventDto): Promise<Event> {
    const data = await this.eventsRepository.findOne({
      relations: ['teamA', 'teamB', 'competition'],
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

  async create(event: CreateEventDto): Promise<Event> {
    const newData = this.eventsRepository.create(event);
    const savedData = await this.eventsRepository.save(newData);

    const res = await this.eventsRepository.findOne({
      relations: ['teamA', 'teamB', 'competition'],
      where: {
        id: savedData.id,
      },
    });

    return res;
  }
}
