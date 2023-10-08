import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionController } from './events/controllers/competition.controller';
import { EventsController } from './events/controllers/events.controller';
import { TeamController } from './events/controllers/team.controller';
import { Competition } from './events/entities/competition.entity';
import { Team } from './events/entities/team.entity';
import { EventsGateway } from './events/gateways/events.gateway';
import { CompetitionService } from './events/services/competition.service';
import { EventsService } from './events/services/events.service';
import { TeamService } from './events/services/team.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: '1234',
      database: 'sports-events',
      entities: [Competition, Event, Team],
      synchronize: false,
    }),
  ],
  controllers: [EventsController, CompetitionController, TeamController],
  providers: [EventsGateway, EventsService, CompetitionService, TeamService],
})
export class AppModule {}
