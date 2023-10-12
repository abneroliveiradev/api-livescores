import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';
@Entity('moves', { schema: 'sports-events' })
export class Move {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  minute: number;

  @Column({ type: 'varchar', name: 'description' })
  description: string;

  @ManyToOne(() => Event, (event) => event.moves)
  event: Event;
}
