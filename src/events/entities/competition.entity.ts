import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('competitions', { schema: 'sports-events' })
export class Competition {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: string;

  @Column({ type: 'varchar', name: 'name' })
  name: string;
}
