import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events/controllers/events.controller';
import { EventsGateway } from './events/gateways/events.gateway';
import { EventsService } from './events/services/events.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PSWD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  controllers: [EventsController],
  providers: [EventsGateway, EventsService],
})
export class AppModule {}
