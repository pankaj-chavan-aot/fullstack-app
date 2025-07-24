

// import {
//   Controller,
//   Get,
//   Post,
//   Put,
//   Body,
//   Param,
//   Req,
//   ForbiddenException,
//   UseGuards,
//   ParseIntPipe,
// } from '@nestjs/common';
// import { TasksService } from './tasks.service';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
// import { Role } from '../common/decorators/roles.decorator';
// import { UserRole } from '../users/entities/user.entity';
// import { JwtAuthGuard } from '../auth/jwt.strategy';
// import { RolesGuard } from '../common/guards/roles.guard';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('tasks')
// @UseGuards(AuthGuard('jwt'), RolesGuard)
// export class TasksController {
//   constructor(private tasksService: TasksService) {}

//   // ✅ Admin: Get all tasks
//   @Get()
//   @Role(UserRole.ADMIN)
//   findAll() {
//     return this.tasksService.findAll(); // Admin gets all
//   }

//   // ✅ User: Get only their own tasks
//   @Get('me')
//   @Role(UserRole.USER)
//   findMy(@Req() req) {
//     return this.tasksService.findByUser(req.user.id); // User gets only own
//   }

//   // ✅ User/Admin: Create task
//   @Post()
//   @Role(UserRole.USER, UserRole.ADMIN)
//   create(@Body() dto: CreateTaskDto, @Req() req) {
//     return this.tasksService.create(dto, req.user); 
//     // 👆 if admin: can pass userId in body to assign
//     // if user: will auto-assign to self
//   }

//   // ✅ User/Admin: Update task
//   @Put(':id')
//   @Role(UserRole.USER, UserRole.ADMIN)
//   async update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() dto: UpdateTaskDto,
//     @Req() req,
//   ) {
//     const task = await this.tasksService.findOne(id);

//     // 🛡️ Block non-admins from editing others' tasks
//     if (req.user.role !== UserRole.ADMIN && task.user.id !== req.user.id) {
//       throw new ForbiddenException('You can only edit your own tasks');
//     }

//     return this.tasksService.update(id, dto);
//   }
// }
// src/tasks/tasks.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
//import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
//import { Role } from '../auth/decorators/role.decorator';
//import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { Role } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';


@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Role(UserRole.ADMIN, UserRole.USER)
  async create(@Body() dto: CreateTaskDto, @Req() req) {
    const task = await this.tasksService.create(dto, req.user);
    return task;
  }

  @Get()
  @Role(UserRole.ADMIN, UserRole.USER)
  async findAll(@Req() req) {
    const tasks = await this.tasksService.findAll(req.user);
    return tasks;
  }

  @Get(':id')
  @Role(UserRole.ADMIN, UserRole.USER)
  async findOne(@Param('id') id: number, @Req() req) {
    const task = await this.tasksService.findOne(id);
    if (req.user.role !== UserRole.ADMIN && task.user.id !== req.user.id) {
      throw new ForbiddenException('Access denied');
    }
    return task;
  }

  @Put(':id')
  @Role(UserRole.ADMIN, UserRole.USER)
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto, @Req() req) {
    const task = await this.tasksService.update(id, dto, req.user);
    return task;
  }

  @Delete(':id')
  @Role(UserRole.ADMIN, UserRole.USER)
  async remove(@Param('id') id: number, @Req() req) {
    await this.tasksService.remove(id, req.user);
    return { message: 'Task deleted successfully' };
  }
}
