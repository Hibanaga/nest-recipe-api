import { UserRole } from '../entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';
export const Role = (role: UserRole) => SetMetadata(ROLE_KEY, role);
