import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jswService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  private async validateUser(userDto: CreateUserDto) {
    try {
      const user = await this.userService.getUserByEmail(userDto.email);
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (user && passwordEquals) {
        return user;
      }
      throw new HttpException(
        'wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        'wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        `email: ${userDto.email} is already exist`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const hashPassword = await bcrypt.hash(userDto.password, 8);
      const user = this.userService.createUser({
        ...userDto,
        password: hashPassword,
      });
      return this.generateToken(user);
    }
  }

  async generateToken(user) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jswService.sign(payload),
    };
  }
}
