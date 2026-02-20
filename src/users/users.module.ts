import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService, AuthGuard],
})
export class UsersModule {}
