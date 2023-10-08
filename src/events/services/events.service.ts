import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventsService {
  private readonly events: Event[] = [];

  async getLiveEvents(): Promise<Event[]> {
    return this.events.filter((event) => event.status === 'live');
  }

  async getEventsByDate(date: string): Promise<Event[]> {
    return this.events.filter((event) => event.startTime === new Date(date));
  }

  async getFinishedEventsByDate(date: string): Promise<Event[]> {
    return this.events.filter(
      (event) =>
        event.startTime === new Date(date) && event.status === 'finished',
    );
  }

  /*   async createEvent(event: EventInput): Promise<Event> {
    // Implementar a lógica para criar um evento
    // Certificar-se de atribuir IDs únicos aos eventos
    // this.eventGateway.server.emit('liveEvents', event);

    this.events.push(event);
    return event;
  } */
}
