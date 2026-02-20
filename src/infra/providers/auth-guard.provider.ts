import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  private secret: string;
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {
    this.secret = this.config.get<string>('JWT_SECRET') as string;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.validateTokenFromHeaders(request);

    if (!token) {
      throw new UnauthorizedException(
        'Unauthorized: token inválido ou não informado.',
      );
    }

    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(token, {
        secret: this.secret,
      });
      request['user'] = payload;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException();
    }
    return true;
  }

  validateTokenFromHeaders(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Basic' ? token : undefined;
  }
}
