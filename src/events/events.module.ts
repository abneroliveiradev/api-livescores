import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionController } from './controllers/competition.controller';
import { EventsController } from './controllers/events.controller';
import { TeamController } from './controllers/team.controller';
import { Competition } from './entities/competition.entity';
import { Event } from './entities/event.entity';
import { Team } from './entities/team.entity';
import { CompetitionService } from './services/competition.service';
import { EventsService } from './services/events.service';
import { TeamService } from './services/team.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Competition, Team])],
  controllers: [CompetitionController, EventsController, TeamController],
  providers: [CompetitionService, EventsService, TeamService],
  exports: [],
})
export class EventModule {}
