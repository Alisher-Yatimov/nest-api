import {
  Body,
  Controller,
  HttpCode,
  Post,
  Redirect,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  @HttpCode(201)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
