import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const eventsList = [
  {
    id: 1,
    gameMinute: "30'",
    teamA: 'Team A',
    teamB: 'Team B',
    scoreA: 2,
    scoreB: 1,
    eventTime: '2022-01-01',
    eventDescription: 'Event Description',
    status: 'live',
  },
  {
    id: 2,
    gameMinute: "22'",
    teamA: 'Team A',
    teamB: 'Team B',
    scoreA: 2,
    scoreB: 1,
    eventTime: '2022-01-01',
    eventDescription: 'Event Description',
    status: 'live',
  },
  {
    id: 3,
    gameMinute: "12'",
    teamA: 'Team A',
    teamB: 'Team B',
    scoreA: 2,
    scoreB: 1,
    eventTime: '2022-01-01',
    eventDescription: 'Event Description',
    status: 'live',
  },
  {
    id: 4,
    gameMinute: "4'",
    teamA: 'Team A',
    teamB: 'Team B',
    scoreA: 2,
    scoreB: 1,
    eventTime: '2022-01-01',
    eventDescription: 'Event Description',
    status: 'live',
  },
];
@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log(payload);
    this.server.emit('msgToClient', payload, client.id);
  }

  afterInit() {
    this.logger.log('Init');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
