// @Entity()
// export class User {
//   @PrimaryGeneratedColumn() id: number;
//   @Column({ unique: true }) username: string;
//   @Column() password: string;
//   @Column({ type: 'enum', enum: UserRole, default: UserRole.USER }) role: UserRole;
//   @OneToMany(() => Task, task => task.user) tasks: Task[];
// }
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
//import { Task } from '../../tasks/entities/task.entity';
//import { Task } from /tasks/task.entity;    
// Instead of this:
//import { Task } from './entities/user.entity';
import { Task } from '../tasks/task.entity';



export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
