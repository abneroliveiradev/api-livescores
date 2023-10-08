import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition } from './events/entities/competition.entity';
import { Team } from './events/entities/team.entity';
import { EventModule } from './events/events.module';

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
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
