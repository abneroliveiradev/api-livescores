import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Competition {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: string;

  @Column({ type: 'varchar', name: 'name' })
  name: string;
}
