// src/events/events.controller.ts

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { Event } from '../entities/event.entity';
import { EventsService } from '../services/events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('live')
  async getLiveEvents(): Promise<Event[]> {
    return this.eventsService.getLiveEvents();
  }

  @Get('byDate')
  async getEventsByDate(@Query('date') date: string): Promise<Event[]> {
    return this.eventsService.getEventsByDate(date);
  }

  @Get('finished')
  async getFinishedEventsByDate(@Query('date') date: string): Promise<Event[]> {
    return this.eventsService.getFinishedEventsByDate(date);
  }

  @Post()
  async createEvent(@Body() event: CreateEventDto): Promise<any> {
    // Dados sendo validado pelo class-validator

    // verificar se chave unica ja existe (teamA, teamB, competition, date)

    const existingEvent = await this.eventsService.getScheduledEvents(event);
    if (existingEvent) {
      throw new Error('Event already exists');
    }
    console.log(event);

    // criar o evento
    const data = await this.eventsService.createEvent(event);
    // se nao existir, criar o evento
    // se existir e status diferente de scheduled, atualizar o evento
    // injetar o websocket e emitir o evento no canal liveEvents
    // return this.eventsService.createEvent(event);
    return data;
  }
}
