import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()  
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  age: number;

  @Column()
  breed: string;
}
