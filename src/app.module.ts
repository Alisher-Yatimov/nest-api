import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/todos.model';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todo_app',
      models: [Todo],
      autoLoadModels: true,
    }),
    TodosModule,
    AuthModule,
    UsersModule
  ],
})
export class AppModule {}
