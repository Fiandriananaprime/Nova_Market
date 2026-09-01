import { User } from './user';

export interface LoginRequest {
  email: string;
  password: string;
  remember: boolean;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface AuthResponse {
  token: AuthTokens;
  user: User;
}