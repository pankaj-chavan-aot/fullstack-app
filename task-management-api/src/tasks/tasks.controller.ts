import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Req,
  ForbiddenException,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Role } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import{ JwtAuthGuard } from '../auth/jwt.strategy';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @Role(UserRole.ADMIN)
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('me')
  @Role(UserRole.USER)
  findMy(@Req() req) {
    return this.tasksService.findByUser(req.user.id);
  }

  @Post()
  @Role(UserRole.USER)
  create(@Body() dto: CreateTaskDto, @Req() req) {
    return this.tasksService.create(dto, req.user.id);
  }

  @Put(':id')
  @Role(UserRole.USER)
  
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @Req() req,
  ) {
    const task = await this.tasksService.findOne(id);
    if (
      req.user.role !== UserRole.ADMIN &&
      task.user.id !== req.user.id
    ) {
      throw new ForbiddenException();
    }
    return this.tasksService.update(id, dto);
  }
}
