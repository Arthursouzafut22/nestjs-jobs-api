import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/dto-users';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
  private secret: string;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {
    this.secret = this.config.get<string>('JWT_SECRET') as string;
  }

  // Cadastrar usuario...
  async create(user: CreateUserDto) {
    const findUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (findUser) {
      throw new ConflictException('E-mail já está cadastrado!');
    }

    await this.prisma.user.create({
      data: { ...user, password: await this.generateHash(user?.password) },
    });

    return {
      message: 'Usuário criado com sucesso',
    };
  }

  // Gerar senha cryptografada....
  async generateHash(passwordUser: string) {
    const salt = 10;
    const hashPassword = await bcrypt.hash(passwordUser, salt);
    return hashPassword;
  }

  // Retorna usuario autenticado...
  async getUser(authHeader: string) {
    const token = authHeader?.split(' ')[1];
    const payload = await this.jwt.verifyAsync<JwtPayload>(token, {
      secret: this.secret,
    });

    const { sub, name, email, role } = payload;

    return {
      sub,
      name,
      email,
      role,
    };
  }

  updateUser(data: UpdateUserDto, userId: number) {
    return { ...data, userId };
  }

  // Deletar usuario do banco...
  async deleteUser(userId: number) {
    try {
      await this.prisma.user.delete({ where: { id: userId } });
      return { message: 'Usuario deletado com sucesso.' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Não foi possível deletar o usuário. Possíveis causas: usuário inexistente ou token de autenticação inválido.',
      );
    }
  }
}
