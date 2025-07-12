// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

//   async findByUsername(username: string): Promise<User> {
//     return this.usersRepo.findOne({ where: { username } });
// 
 async findByUsername(username: string): Promise<User | null> {
  return this.usersRepo.findOne({ where: { username } });
}

  async findById(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }
}
