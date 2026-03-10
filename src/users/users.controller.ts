import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  Get,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/dto-users';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from 'src/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  getUser(@Headers('authorization') authHeader: string) {
    return this.userService.getUser(authHeader);
  }

  @Patch('update')
  updateUser(@Body() data: UpdateUserDto, @User('id') userId: number) {
    return this.userService.updateUser(data, userId);
  }

  @Delete('delete')
  deleteUser(@User('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
