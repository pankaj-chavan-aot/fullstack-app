// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus, TaskPriority } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepo.find({ relations: ['user'] });
  }

  async findByUser(userId: number): Promise<Task[]> {
    return this.tasksRepo.find({ where: { user: { id: userId } }, relations: ['user'] });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepo.findOne({ where: { id }, relations: ['user'] });
    if (!task) throw new NotFoundException(`Task #${id} not found`);
    return task;
  }

  async create(dto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.tasksRepo.create({
      ...dto,
      status: TaskStatus.TODO,
      user: { id: userId } as any,
    });
    return this.tasksRepo.save(task);
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, dto);
    return this.tasksRepo.save(task);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tasksRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Task #${id} not found`);
  }
}
