import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Team {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: string;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'imageLink' })
  imageLink: string;
}
