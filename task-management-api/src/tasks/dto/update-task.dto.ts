
// // src/tasks/dto/create-task.dto.ts
// import { IsString, IsEnum, IsOptional, IsInt } from 'class-validator';
// import { TaskPriority, TaskStatus } from '../task.entity';

// export class CreateTaskDto {
//   @IsString()
//   title: string;

//   @IsString()
//   description: string;

//   @IsEnum(TaskPriority)
//   @IsOptional()
//   priority?: TaskPriority;

//   @IsEnum(TaskStatus)
//   @IsOptional()
//   status?: TaskStatus;

//   @IsInt()
//   @IsOptional()
//   userId?: number; // ✅ admin assigns to another user
// }


import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
