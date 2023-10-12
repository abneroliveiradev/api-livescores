// src/events/events.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventsGateway } from '../gateways/events.gateway';
import { EventsService } from '../services/events.service';
import { MovesService } from '../services/moves.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventsGateway: EventsGateway,
    private readonly movesService: MovesService,
  ) {}

  @Get()
  async findAll(): Promise<any> {
    const events = await this.eventsService.findAll();
    this.eventsGateway.server.emit('msgToClient', events);
    return events;
  }

  @Get('scheduled')
  async findAllScheduled(): Promise<any> {
    const events = await this.eventsService.findAllScheduled();
    console.log(events);
    return events;
  }

  @Get('finished')
  async findAllFinished(): Promise<any> {
    const events = await this.eventsService.findAllFinished();
    console.log(events);
    return events;
  }

  @Get('finished/:date')
  async findAllFinishedByDate(@Param('date') date: string): Promise<any> {
    const events = await this.eventsService.findAllFinishedByDate(date);
    return events;
  }

  @Post()
  async createEvent(@Body() event: CreateEventDto): Promise<any> {
    try {
      const { status } = event;

      //Verificar se o evento já foi finalizado
      if (status === 'finished') {
        const finishedEvent =
          await this.eventsService.checkFinishedEvent(event);
        if (finishedEvent) {
          throw new Error('Event has already been finished');
        }
      }

      // Verificar se chave unica ja existe (teamA, teamB, competition, date)
      const existingEvent = await this.eventsService.checkScheduledEvent(event);
      if (existingEvent && status === 'scheduled') {
        throw new Error('Event already exists');
      }

      if (existingEvent && ['finished', 'live'].includes(status)) {
        //Finaliza o evento
        if (status === 'finished') {
          const finishedEvent = await this.eventsService.update(
            existingEvent.id,
            event,
          );
          this.eventsGateway.server.emit('finishedGames', finishedEvent);
          return finishedEvent;
        }
        // Atualiza o evento
        if (status === 'live') {
          const finishedEvent = await this.eventsService.update(
            existingEvent.id,
            event,
          );
          this.eventsGateway.server.emit('liveGames', finishedEvent);
          return finishedEvent;
        }
      } else {
        // Cria o evento
        const createdEvent = await this.eventsService.create(event);
        const scheduledEventList = await this.eventsService.findAllScheduled();
        console.log(scheduledEventList);
        this.eventsGateway.server.emit('scheduledGames', scheduledEventList);
        return createdEvent;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
