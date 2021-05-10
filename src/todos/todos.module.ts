import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from './todos.model';
import { User } from 'src/users/users.model';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [
    SequelizeModule.forFeature([Todo, User]),
    forwardRef(() => AuthModule),
  ],
})
export class TodosModule {}
