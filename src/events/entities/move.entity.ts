import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('moves', { schema: 'sports-events' })
export class Move {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  minute: number;

  @Column({ type: 'varchar', name: 'description' })
  description: string;
}
