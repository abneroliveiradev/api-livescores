import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('teams', { schema: 'sports-events' })
export class Team {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: string;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'imageLink' })
  imageLink: string;
}
