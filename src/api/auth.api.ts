import { baseApi, api } from "./axios";
import { LoginRequest, AuthResponse } from "../type/auth";

export const login = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  const response = await baseApi.post<AuthResponse>(
    "/auth/login",
    credentials
  );

  return response.data;
};

export const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }
  } catch (error) {
    console.warn(
      "Logout request failed, clearing local session anyway.",
      error
    );
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    window.dispatchEvent(new CustomEvent("auth:logout"));
  }
};

export const getMe = async (): Promise<AuthResponse["user"]> => {
  const response = await api.get("/auth/me");

  return response.data;
};