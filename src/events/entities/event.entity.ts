import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('events', { database: 'events_messages' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  startTime: Date;

  @Column()
  status: 'live' | 'a_iniciar' | 'finalizado';

  @OneToOne(() => Team, (team) => team.event)
  teamA: Team;

  @Column()
  pointsTeamA: number;

  @OneToOne(() => Team, (team) => team.event)
  teamB: Team;

  @Column()
  pointsTeamB: number;

  @OneToOne(() => Competition, (competition) => competition.event)
  competition: Competition;
}
