import { Role } from '@prisma/client';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: Role;
}
