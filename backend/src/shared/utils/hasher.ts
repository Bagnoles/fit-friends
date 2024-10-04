import { compare, genSalt, hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export async function generateHash(string: string) {
  const salt = await genSalt(SALT_ROUNDS);
  const hashString = await hash(string, salt);
  return hashString;
}

export function compareHash(string: string, hash: string) {
  return compare(string, hash);
}
