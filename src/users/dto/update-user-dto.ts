import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './dto-users';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {}
