import { Role } from '@prisma/client';

export interface JwtPayload {
  sub: number;
  name: string;
  email: string;
  role: Role;
  expiresIn: string;
}
