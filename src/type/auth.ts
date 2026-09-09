import { User } from './user';

export type status = "pending" | "approved" | "rejected";

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
  tokens: AuthTokens;
  user: User;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface RegisterSellerRequest extends RegisterRequest {
   businessName: string;
   phone: string;
   location: string;
}

export interface RegisterSellerResponse {
    id: string;
    businessName: string;
    owner: string;
    email: string;
    phone: string;
    location: string;
    date: string;
    status: status;
}
