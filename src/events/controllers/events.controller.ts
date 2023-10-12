// src/events/events.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventsGateway } from '../gateways/events.gateway';
import { EventsService } from '../services/events.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventsGateway: EventsGateway,
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
    return events;
  }

  @Get('finished')
  async findAllFinished(): Promise<any> {
    const events = await this.eventsService.findAllFinished();
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

      // Verificar se evento já exsite (teamA + teamB + competition + date)
      const existingEvent = await this.eventsService.checkEventExists(event);
      console.log('checkEventExists', existingEvent);

      if (existingEvent) {
        // Verifica se o evento está finalizado
        if (existingEvent.status === 'finished') {
          throw new Error('Evento já finalizado');
        }

        if (status === 'finished') {
          // Finalizar evento
          console.log('finalizar evento');
          const finishedEvent = await this.eventsService.update(
            existingEvent.id,
            event,
          );
          this.eventsGateway.server.emit('finishedGames', finishedEvent);
          return finishedEvent;
        }

        // Tornar evento em andamento
        if (status === 'live') {
          console.log('em andamento');

          const liveMoveEvent = await this.eventsService.update(
            existingEvent.id,
            event,
          );
          console.log('liveMoveEvent', liveMoveEvent);
          this.eventsGateway.server.emit('liveMoves', liveMoveEvent);
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
      return 'ok';
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
