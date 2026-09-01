import { baseApi } from "./axios";
import { LoginRequest, AuthResponse } from "../type/auth";

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await baseApi.post<AuthResponse>("/auth/login", credentials);
  return response.data;
}