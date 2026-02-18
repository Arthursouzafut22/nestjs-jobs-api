import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/dto-users';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    const findUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (findUser) {
      throw new ConflictException('E-mail já está cadastrado!');
    }

    const createUser = await this.prisma.user.create({
      data: { ...user, password: await this.generateHash(user?.password) },
    });

    return {
      message: 'Usuário criado com sucesso',
      createUser,
    };
  }

  async generateHash(passwordUser: string) {
    const salt = 10;
    const hashPassword = await bcrypt.hash(passwordUser, salt);
    return hashPassword;
  }
}
