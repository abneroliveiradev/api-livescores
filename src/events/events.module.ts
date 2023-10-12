import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './controllers/events.controller';
import { Competition } from './entities/competition.entity';
import { Event } from './entities/event.entity';
import { Team } from './entities/team.entity';
import { EventsGateway } from './gateways/events.gateway';
import { EventsService } from './services/events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Competition, Team])],
  controllers: [EventsController],
  providers: [EventsService, EventsGateway],
  exports: [],
})
export class EventModule {}
