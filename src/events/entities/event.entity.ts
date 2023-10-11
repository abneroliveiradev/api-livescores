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
  startTime: string;

  @Column()
  status: string;

  @Column('int')
  teamAId: number;

  @OneToOne(() => Team)
  @JoinColumn()
  teamA: Team;

  @Column()
  scoreA: number;

  @Column('int')
  teamBId: number;

  @OneToOne(() => Team)
  @JoinColumn()
  teamB: Team;

  @Column()
  scoreB: number;

  @Column('int')
  competitionId: number;

  @OneToOne(() => Competition)
  @JoinColumn()
  competition: Competition;
}
