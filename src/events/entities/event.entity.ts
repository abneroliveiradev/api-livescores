import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Competition } from './competition.entity';
import { Team } from './team.entity';
@Entity('events', { database: 'events_messages' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  startTime: Date;

  @Column()
  status: 'live' | 'a_iniciar' | 'finalizado';

  @OneToOne(() => Team, (team) => team.id)
  teamA: Team;

  @Column()
  pointsTeamA: number;

  @OneToOne(() => Team, (team) => team.id)
  teamB: Team;

  @Column()
  pointsTeamB: number;

  @OneToOne(() => Competition, (competition) => competition.id)
  competition: Competition;
}
