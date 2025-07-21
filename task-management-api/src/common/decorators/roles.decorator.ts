// // export const Role = (role: UserRole) => SetMetadata('role', role);
// import { SetMetadata } from '@nestjs/common';
// import { UserRole } from '../../users/entities/user.entity';

// export const Role = (role: UserRole) => SetMetadata('role', role);

// src/common/decorators/roles.decorator.ts

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Role = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
