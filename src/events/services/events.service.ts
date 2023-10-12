import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { Event } from '../entities/event.entity';
import { Move } from '../entities/move.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Move)
    private movesRepository: Repository<Move>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find({
      relations: ['teamA', 'teamB', 'competition', 'moves'],
      order: {
        id: 'DESC',
      },
    });
  }

  async findAllScheduled(): Promise<Event[]> {
    return this.eventsRepository.find({
      relations: ['teamA', 'teamB', 'competition', 'moves'],
      where: {
        status: 'scheduled',
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findAllFinished(): Promise<Event[]> {
    return this.eventsRepository.find({
      relations: ['teamA', 'teamB', 'competition', 'moves'],
      where: {
        status: 'finished',
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findAllFinishedByDate(date: string): Promise<Event[]> {
    return this.eventsRepository.find({
      relations: ['teamA', 'teamB', 'competition'],
      where: {
        status: 'finished',
        startTime: date, //tratar data de entrada
      },
    });
  }

  async findAllByDate(date: string): Promise<Event[]> {
    return this.eventsRepository.find({
      relations: ['teamA', 'teamB', 'competition', 'moves'],
      where: {
        startTime: date, //tratar data de entrada
      },
    });
  }

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

  async checkFinishedEvent(event: CreateEventDto): Promise<Event> {
    const data = await this.eventsRepository.findOne({
      relations: ['teamA', 'teamB', 'competition', 'moves'],
      where: {
        status: 'finished',
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

    const newMove = this.movesRepository.create({
      minute: event.gameMinute,
      description: event.eventDescription,
      eventId: savedData.id,
    });
    await this.movesRepository.save(newMove);

    const res = await this.eventsRepository.findOne({
      relations: ['teamA', 'teamB', 'competition', 'moves'],
      where: {
        id: savedData.id,
      },
    });

    return res;
  }

  async update(id: number, event: CreateEventDto): Promise<Event> {
    try {
      const newMove = this.movesRepository.create({
        minute: event.gameMinute,
        description: event.eventDescription,
        eventId: id,
      });
      await this.movesRepository.save(newMove);

      await this.eventsRepository.update(id, event);
      const res = await this.eventsRepository.findOne({
        relations: ['teamA', 'teamB', 'competition', 'moves'],
        where: {
          id: id,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
