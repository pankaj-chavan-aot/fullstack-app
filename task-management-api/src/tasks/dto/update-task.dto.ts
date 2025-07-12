// export class UpdateTaskDto {
//   @IsOptional() @IsEnum(TaskStatus) status?: TaskStatus;
//   @IsOptional() @IsEnum(TaskPriority) priority?: TaskPriority;
//   @IsOptional() @IsNotEmpty() title?: string;
//   @IsOptional() @IsNotEmpty() description?: string;
// }
import { IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { TaskPriority, TaskStatus } from '../task.entity';

export class UpdateTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
