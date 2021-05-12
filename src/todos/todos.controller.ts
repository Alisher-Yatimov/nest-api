import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/users.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoDto } from './dto/get-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Req() request) {
    const { user } = request;
    return this.todoService.getAllTodo(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  CreateTodo(@Body() todoDto: CreateTodoDto, @Req() request) {
    const { user } = request;
    return this.todoService.createTodo({ ...todoDto, userId: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: GetTodoDto) {
    return this.todoService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: GetTodoDto) {
    try {
      return this.todoService.deleteOne(id);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateOne(@Param('id') id: GetTodoDto) {
    try {
      return this.todoService.checkOne(id);
    } catch (error) {
      return error;
    }
  }
}
