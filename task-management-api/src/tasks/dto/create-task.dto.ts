// export class CreateTaskDto {
//   @IsNotEmpty() title: string;
//   @IsNotEmpty() description: string;
//   @IsEnum(TaskPriority) priority: TaskPriority;
// }
import { IsNotEmpty, IsEnum } from 'class-validator';
//import { TaskPriority } from '../entities/task.entity';
import { TaskPriority, TaskStatus } from '../task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;
}
