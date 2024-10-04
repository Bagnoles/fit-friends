export interface TokenPayload {
  id: string;
  email: string;
}

export interface RefreshTokenPayload extends TokenPayload {
  tokenId: string;
}
