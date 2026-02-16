import { Controller, HttpCode, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor() {}

  @HttpCode(201)
  @Post('/')
  create() {
    return 'Ola mundo';
  }
}
