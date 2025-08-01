// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { Task } from './entities/task.entity';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
