import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './controllers/events.controller';
import { Competition } from './entities/competition.entity';
import { Event } from './entities/event.entity';
import { Move } from './entities/move.entity';
import { Team } from './entities/team.entity';
import { EventsGateway } from './gateways/events.gateway';
import { EventsService } from './services/events.service';
import { MovesService } from './services/moves.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Competition, Team, Move])],
  controllers: [EventsController],
  providers: [EventsService, EventsGateway, MovesService],
  exports: [],
})
export class EventModule {}
