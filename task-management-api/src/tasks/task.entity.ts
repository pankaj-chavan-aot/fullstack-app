// @Entity()
// export class Task {
//   @PrimaryGeneratedColumn() id: number;
//   @Column() title: string;
//   @Column() description: string;
//   @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO }) status: TaskStatus;
//   @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM }) priority: TaskPriority;
//   @ManyToOne(() => User, user => user.tasks) user: User;
// }
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
//import { User } from '../../users/entities/user.entity';
import { User } from '../users/entities/user.entity';
//import { User } from '../users/user.entity'; 
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
