// // src/users/users.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { User, UserRole } from './entities/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';

// @Injectable()
// export class UsersService {
//   constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

//   async create(data: Partial<User>): Promise<User> {
//     const user = this.usersRepo.create(data);
//     return this.usersRepo.save(user);
//   }

// //   async findByUsername(username: string): Promise<User> {
// //     return this.usersRepo.findOne({ where: { username } });
// // 
// //  async findByUsername(username: string): Promise<User | null> {
// //   return this.usersRepo.findOne({ where: { username } });
// // }
// async findByUsername(username: string): Promise<User | null> {
//   return this.usersRepo.findOne({
//     where: { username },
//     //relations: ['role'],
//   });
// }


//   async findById(id: number): Promise<User> {
//     const user = await this.usersRepo.findOne({ where: { id } });
//     if (!user) throw new NotFoundException(`User #${id} not found`);
//     return user;
//   }

//   async findAll(): Promise<User[]> {
//     return this.usersRepo.find();
//   }
// }


import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; // bcrypt import कर

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { username },
    });
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  // ✅ Create default admin user if not exists
  async createAdminUserIfNotExists() {
    const existingAdmin = await this.usersRepo.findOne({ where: { username: 'adminUser' } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10); // default password
      const admin = this.usersRepo.create({
        username: 'adminUser',
        password: hashedPassword,
        role: UserRole.ADMIN,
      });
      await this.usersRepo.save(admin);
      console.log('✅ Default admin user created!');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }
  }

  // ⏱ Automatically called when app starts
  async onModuleInit() {
    await this.createAdminUserIfNotExists();
  }
}
