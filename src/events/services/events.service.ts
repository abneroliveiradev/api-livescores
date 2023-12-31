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
  async findAllLive(): Promise<Event[]> {
    return this.eventsRepository.find({
      relations: ['teamA', 'teamB', 'competition', 'moves'],
      where: {
        status: 'live',
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findAllFinishedByDate(data: string): Promise<Event[]> {
    console.log(data);
    return this.eventsRepository.find({
      relations: ['teamA', 'teamB', 'competition'],
      where: {
        status: 'finished',
        startTime: data,
      },
    });
  }

  async findAllByDate(date: string): Promise<Event[]> {
    return this.eventsRepository.find({
      relations: ['teamA', 'teamB', 'competition', 'moves'],
      where: {
        startTime: date,
      },
    });
  }

  async checkEventExists(event: CreateEventDto): Promise<Event> {
    const data = await this.eventsRepository.findOne({
      relations: ['teamA', 'teamB', 'competition'],
      where: {
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

  async update(id: number, event: CreateEventDto): Promise<any> {
    try {
      const newMove = this.movesRepository.create({
        minute: event.gameMinute,
        description: event.eventDescription,
        eventId: id,
      });
      const savedMove = await this.movesRepository.save(newMove);

      const eventObj = {
        id: id,
        startTime: event.startTime,
        status: event.status,
        teamAId: event.teamAId,
        scoreA: event.scoreA,
        teamBId: event.teamBId,
        scoreB: event.scoreB,
        competitionId: event.competitionId,
      };

      await this.eventsRepository.update(id, eventObj);
      // Montar retorno do ultimo move registrado
      const lastMove = await this.movesRepository.findOne({
        relations: ['event', 'event.teamA', 'event.teamB', 'event.competition'],
        where: {
          id: savedMove.id,
        },
      });

      return lastMove;
    } catch (error) {
      console.log(error);
    }
  }
}
