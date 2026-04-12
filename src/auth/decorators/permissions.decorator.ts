import { SetMetadata } from '@nestjs/common';
import { Permission } from '../constants/permissions.enum';

// This key is used by the Reflector to find the metadata
export const PERMISSIONS_KEY = 'permissions';

export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
