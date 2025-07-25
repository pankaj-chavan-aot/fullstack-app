// // // src/tasks/tasks.service.ts
// // import { Injectable, NotFoundException } from '@nestjs/common';
// // import { InjectRepository } from '@nestjs/typeorm';
// // import { Repository } from 'typeorm';
// // import { Task, TaskStatus, TaskPriority } from './task.entity';
// // import { CreateTaskDto } from './dto/create-task.dto';
// // import { UpdateTaskDto } from './dto/update-task.dto';

// // @Injectable()
// // export class TasksService {
// //   constructor(
// //     @InjectRepository(Task)
// //     private tasksRepo: Repository<Task>,
// //   ) {}

// //   async findAll(): Promise<Task[]> {
// //     return this.tasksRepo.find({ relations: ['user'] });
// //   }

// //   async findByUser(userId: number): Promise<Task[]> {
// //     return this.tasksRepo.find({ where: { user: { id: userId } }, relations: ['user'] });
// //   }

// //   async findOne(id: number): Promise<Task> {
// //     const task = await this.tasksRepo.findOne({ where: { id }, relations: ['user'] });
// //     if (!task) throw new NotFoundException(`Task #${id} not found`);
// //     return task;
// //   }

// //   async create(dto: CreateTaskDto, userId: number): Promise<Task> {
// //     const task = this.tasksRepo.create({
// //       ...dto,
// //       status: TaskStatus.TODO,
// //       user: { id: userId } as any,
// //     });
// //     return this.tasksRepo.save(task);
// //   }

// //   async update(id: number, dto: UpdateTaskDto): Promise<Task> {
// //     const task = await this.findOne(id);
// //     Object.assign(task, dto);
// //     return this.tasksRepo.save(task);
// //   }

// //   async remove(id: number): Promise<void> {
// //     const result = await this.tasksRepo.delete(id);
// //     if (result.affected === 0) throw new NotFoundException(`Task #${id} not found`);
// //   }
// // }

// // src/tasks/tasks.service.ts
// import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Task } from './task.entity';
// import { User, UserRole } from '../users/entities/user.entity';

// @Injectable()
// export class TasksService {
//   constructor(
//     @InjectRepository(Task) private tasksRepo: Repository<Task>,
//   ) {}

//   async create(taskData: Partial<Task>, user: User): Promise<Task> {
//     const task = this.tasksRepo.create({
//       ...taskData,
//       user: taskData.user || user, // admin assigns to another user
//     });
//     return this.tasksRepo.save(task);
//   }

//   async findAll(user: User): Promise<Task[]> {
//     if (user.role === UserRole.ADMIN) {
//       return this.tasksRepo.find({ relations: ['user'] });
//     } else {
//       return this.tasksRepo.find({ where: { user: { id: user.id } }, relations: ['user'] });
//     }
//   }

//   async findOne(id: number, user: User): Promise<Task> {
//     const task = await this.tasksRepo.findOne({ where: { id }, relations: ['user'] });
//     if (!task) throw new NotFoundException('Task not found');
//     if (user.role !== UserRole.ADMIN && task.user.id !== user.id) {
//       throw new ForbiddenException('Access denied');
//     }
//     return task;
//   }
// }

// src/tasks/tasks.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  // Admin assigns task to any user, User assigns to self
  async create(dto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepo.create({
      ...dto,
      user: dto.user || user, // user is set if admin assigns to someone
    });
    return this.tasksRepo.save(task);
  }

  async findAll(user: User): Promise<Task[]> {
      console.log("🔍 User requesting tasks:", user); // 👈 हे टाक

    if (user.role === UserRole.ADMIN) {
      return this.tasksRepo.find({ relations: ['user'] });
    }
    return this.tasksRepo.find({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
  }

  async findByUser(userId: number): Promise<Task[]> {
    return this.tasksRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, dto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.findOne(id);

    if (user.role !== UserRole.ADMIN && task.user.id !== user.id) {
      throw new ForbiddenException('You can only update your own task');
    }

    Object.assign(task, dto);
    return this.tasksRepo.save(task);
  }

  async remove(id: number, user: User): Promise<void> {
    const task = await this.findOne(id);
    if (user.role !== UserRole.ADMIN && task.user.id !== user.id) {
      throw new ForbiddenException('You can only delete your own task');
    }
    await this.tasksRepo.remove(task);
  }
}
