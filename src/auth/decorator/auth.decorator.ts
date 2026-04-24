import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';

export const Auth = (...AuthTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, AuthTypes);
