import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Penguin {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  imageUrl!: string;

  @Column()
  suburb?: string;

  @Column({ nullable: true })
  street?: string;

  @Column()
  rarity?: string;

  @CreateDateColumn()
  dateAdded!: Date;

  @ManyToMany(() => User, (user) => user.penguins)
  users!: User[];
}
