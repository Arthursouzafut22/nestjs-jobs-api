import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { AuthUser } from 'src/auth/types/auth-user.type';

const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as AuthUser;

    if (!user) return null;

    return data ? user[data as keyof AuthUser] : user;
  },
);

export { User };
