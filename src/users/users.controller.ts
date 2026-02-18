import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/dto-users';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }
}
