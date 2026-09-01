import { baseApi, api } from "./axios";
import { 
    LoginRequest, 
    AuthResponse ,
    RegisterRequest,
    RegisterSellerRequest,
    RegisterSellerResponse
  } from "../type/auth";

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await baseApi.post<AuthResponse>("/auth/login", credentials);
  return response.data;
}

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await baseApi.post<AuthResponse>("/auth/register", data);
  return response.data;
}

export const registerSeller = async (data: RegisterSellerRequest): Promise<RegisterSellerResponse> => {
  const response = await baseApi.post<RegisterSellerResponse>("/auth/register/seller", data);
  return response.data;
}

export const logout = async (): Promise<void> => {
    try{
        await baseApi.post("/auth/logout");
    }
    finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    }
}

export const getMe = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};