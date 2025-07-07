import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/user/schemas/user.schema';

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: [Roles, ...Roles[]]) =>
  SetMetadata(ROLES_KEY, roles);
