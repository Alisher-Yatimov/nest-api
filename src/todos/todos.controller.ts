import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoDto } from './dto/get-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    console.log('work');
    return this.todoService.getAllTodo();
  }

  @Post()
  CreateTodo(@Body() todoDto: CreateTodoDto) {
    return this.todoService.createTodo(todoDto);
  }

  @Get(':id')
  getOne(@Param('id') id: GetTodoDto) {
    return this.todoService.getOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: GetTodoDto) {
    try {
      return this.todoService.deleteOne(id);
    } catch (error) {
      return error;
    }
  }
  @Patch(':id')
  updateOne(@Param('id') id: GetTodoDto) {
    try {
      return this.todoService.checkOne(id);
    } catch (error) {
      return error;
    }
  }
}
