import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;

    return user ? user?.[data as keyof typeof user] : user;
  },
);

export { User };
