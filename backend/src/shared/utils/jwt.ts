import { TokenPayload } from '../types/token-payload.interface';
import { User } from '../types/user.interface';

export function createJWTPayload(user: User): TokenPayload {
  return {
    id: user.id,
    email: user.email,
  };
}
