const AUTH_TOKEN_NAME = 'fit-friends-token';

export type Token = string;

export const getAccessToken = (): Token => {
  const token = localStorage.getItem(`${AUTH_TOKEN_NAME}-access`);
  return token ?? '';
};

export const getRefreshToken = (): Token => {
  const token = localStorage.getItem(`${AUTH_TOKEN_NAME}-refresh`);
  return token ?? '';
};

export const saveTokens = (accessToken: Token, refreshToken: Token): void => {
  localStorage.setItem(`${AUTH_TOKEN_NAME}-access`, accessToken);
  localStorage.setItem(`${AUTH_TOKEN_NAME}-refresh`, refreshToken);
};

export const dropTokens = (): void => {
  localStorage.removeItem(`${AUTH_TOKEN_NAME}-access`);
  localStorage.removeItem(`${AUTH_TOKEN_NAME}-refresh`);
};
