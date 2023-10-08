import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Competition } from './competition.entity';
import { Team } from './team.entity';
@Entity('events', { schema: 'sports-events' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  startTime: Date;

  @Column()
  status: 'live' | 'scheduled' | 'finished';

  @Column('int')
  teamAId: number;

  @OneToOne(() => Team)
  @JoinColumn()
  teamA: Team;

  @Column()
  pointsTeamA: number;

  @Column('int')
  teamBId: number;

  @OneToOne(() => Team)
  @JoinColumn()
  teamB: Team;

  @Column()
  pointsTeamB: number;

  @Column('int')
  competitionId: number;

  @OneToOne(() => Competition)
  @JoinColumn()
  competition: Competition;
}
