// // export class CreateTaskDto {
// //   @IsNotEmpty() title: string;
// //   @IsNotEmpty() description: string;
// //   @IsEnum(TaskPriority) priority: TaskPriority;
// // }
// import { IsNotEmpty, IsEnum } from 'class-validator';
// //import { TaskPriority } from '../entities/task.entity';
// import { TaskPriority, TaskStatus } from '../task.entity';

// export class CreateTaskDto {
//   @IsNotEmpty()
//   title: string;

//   @IsNotEmpty()
//   description: string;

//   @IsEnum(TaskPriority)
//   priority: TaskPriority;
// }


/// src/tasks/dto/create-task.dto.ts
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskPriority, TaskStatus } from '../task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  user?: { id: number }; // only used if admin assigns task to other user
}
