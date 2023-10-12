// src/events/events.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import handleError from 'src/commons/handlers/handleError';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventsGateway } from '../gateways/events.gateway';
import { EventsService } from '../services/events.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Get('scheduled')
  async findAllScheduled(): Promise<any> {
    const events = await this.eventsService.findAllScheduled();
    return events;
  }

  @Get('live')
  async findAllLive(): Promise<any> {
    const events = await this.eventsService.findAllLive();
    return events;
  }

  @Get('finished')
  async findAllFinished(): Promise<any> {
    const events = await this.eventsService.findAllFinished();
    return events;
  }

  @Get('finished/:data')
  async findAllFinishedByDate(@Param('data') data: string): Promise<any> {
    console.log('controler', data);
    const events = await this.eventsService.findAllFinishedByDate(data);
    return events;
  }

  @Post()
  async createEvent(@Body() event: CreateEventDto): Promise<any> {
    try {
      const { status } = event;
      console.log(event);
      // Verificar se evento já exsite (teamA + teamB + competition + date)
      const existingEvent = await this.eventsService.checkEventExists(event);

      if (existingEvent) {
        if (existingEvent.status === 'finished' && event.status === 'live') {
          throw new Error('event already finished');
        }

        if (
          existingEvent.status === 'finished' &&
          event.status === 'scheduled'
        ) {
          throw new Error('event already finished');
        }

        if (existingEvent.status === 'live' && event.status === 'scheduled') {
          throw new Error('event already starded');
        }

        if (
          existingEvent.status === 'scheduled' &&
          event.status === 'scheduled'
        ) {
          throw new Error('event already scheduled');
        }

        // Verifica se o evento está finalizado
        if (existingEvent.status === 'finished') {
          throw new Error('event already finished');
        }

        if (status === 'finished') {
          // Finalizar evento
          // console.log('finalizar evento');
          const finishedEvent = await this.eventsService.update(
            existingEvent.id,
            event,
          );

          this.eventsGateway.server.emit('liveMoves', finishedEvent);

          const finisheds = await this.eventsService.findAllFinished();
          this.eventsGateway.server.emit('finishedGames', finisheds);

          const scheduleds = await this.eventsService.findAllScheduled();
          this.eventsGateway.server.emit('scheduledGames', scheduleds);

          const lives = await this.eventsService.findAllLive();
          this.eventsGateway.server.emit('liveGames', lives);

          return finishedEvent;
        }

        // Tornar evento em andamento
        if (status === 'live') {
          // console.log('em andamento');

          const liveMoveEvent = await this.eventsService.update(
            existingEvent.id,
            event,
          );
          this.eventsGateway.server.emit('liveMoves', liveMoveEvent);

          const finisheds = await this.eventsService.findAllFinished();
          this.eventsGateway.server.emit('finishedGames', finisheds);

          const scheduleds = await this.eventsService.findAllScheduled();
          this.eventsGateway.server.emit('scheduledGames', scheduleds);

          const lives = await this.eventsService.findAllLive();
          this.eventsGateway.server.emit('liveGames', lives);
          return liveMoveEvent;
        }
      } else {
        // Obrigatoriamente tem que ter status 'scheduled'
        // Cria o evento
        const createdEvent = await this.eventsService.create(event);
        const scheduledEventList = await this.eventsService.findAllScheduled();
        this.eventsGateway.server.emit('scheduledGames', scheduledEventList);
        return createdEvent;
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }
}
