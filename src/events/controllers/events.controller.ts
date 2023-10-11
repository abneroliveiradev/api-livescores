// src/events/events.controller.ts

import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  async createEvent(@Body() event: CreateEventDto): Promise<any> {
    try {
      const { status } = event;
      // Dados sendo validado pelo class-validator
      // Verificar se chave unica ja existe (teamA, teamB, competition, date)
      const existingEvent = await this.eventsService.checkScheduledEvent(event);
      if (existingEvent && status === 'scheduled') {
        throw new Error('Event already exists');
      }

      if (existingEvent && ['finished', 'live'].includes(status)) {
        // Atualiza o evento
        const updatedEvent = await this.eventsService.update(
          existingEvent.id,
          event,
        );
        this.eventsGateway.server.emit('msgToClient', updatedEvent);
        return updatedEvent;
      } else {
        // Cria o evento
        const createdEvent = await this.eventsService.create(event);
        this.eventsGateway.server.emit('msgToClient', createdEvent);
        return createdEvent;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
