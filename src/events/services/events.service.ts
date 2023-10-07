// src/events/events.service.ts

import { Injectable } from '@nestjs/common';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  private readonly events: Event[] = [];

  async getLiveEvents(): Promise<Event[]> {
    return this.events.filter((event) => event.status === 'live');
  }

  async getEventsByDate(date: string): Promise<Event[]> {
    return this.events.filter((event) => event.date === date);
  }

  async getFinishedEventsByDate(date: string): Promise<Event[]> {
    return this.events.filter(
      (event) => event.date === date && event.status === 'finished',
    );
  }

  async createEvent(event: Event): Promise<Event> {
    // Implementar a lógica para criar um evento
    // Certifique-se de atribuir IDs únicos aos eventos
    this.events.push(event);
    return event;
  }
}
