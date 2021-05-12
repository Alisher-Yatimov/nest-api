import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoDto } from './dto/get-todo.dto';
import { Todo } from './todos.model';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo) private todoRepository: typeof Todo) {}

  async createTodo(dto: CreateTodoDto) {
    const todo = await this.todoRepository.create(dto);
    return todo;
  }

  async getAllTodo(userId: number) {
    const todos = await this.todoRepository.findAll({ where: { userId } });
    return todos;
  }

  async getOne(dto: GetTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id: dto } });
    return todo;
  }

  async deleteOne(dto: GetTodoDto) {
    try {
      const todo = await this.getOne(dto);
      await todo.destroy();
      return dto;
    } catch (error) {
      return error;
    }
  }

  async checkOne(dtoId: GetTodoDto) {
    try {
      const oldTodo = await this.getOne(dtoId);
      const newTodo = await oldTodo.update({ done: !oldTodo.done });
      await newTodo.save();
      return newTodo;
    } catch (error) {
      return error;
    }
  }
}
