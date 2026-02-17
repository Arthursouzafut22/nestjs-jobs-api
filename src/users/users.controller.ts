import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/dto-users';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post('/')
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }
}
