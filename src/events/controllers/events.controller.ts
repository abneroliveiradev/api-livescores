// src/events/events.controller.ts

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EventInput } from '../dto/event-input.dto';
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
  async createEvent(@Body() event: EventInput): Promise<any> {
    // validar os dados do body
    // verificar se chave unica ja existe (teamA, teamB, competition, date)
    // se nao existir, criar o evento
    // se existir, atualizar o evento
    // injetar o websocket e emitir o evento no canal liveEvents
    // return this.eventsService.createEvent(event);
    return 'ok';
  }
}
