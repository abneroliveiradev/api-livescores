import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
