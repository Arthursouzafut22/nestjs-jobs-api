import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/auth-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private expirationToken: string;
  private secret: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {
    this.expirationToken = this.config.get<string>('JWT_EXPIRATION') as string;
    this.secret = this.config.get<string>('JWT_SECRET') as string;
  }

  async login(credentials: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: String(credentials.email) },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválido');
    }

    const comparePassWord = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!comparePassWord) {
      throw new UnauthorizedException('Email ou senha inválido');
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      expiresIn: this.expirationToken,
    };

    const token = await this.jwt.signAsync(payload, { secret: this.secret });

    return { access_token: token };
  }
}
