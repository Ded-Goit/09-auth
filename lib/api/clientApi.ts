// lib/api/clientApi.ts

import axiosInstance from "./api";
import { User } from "@/types/user";

// Зручніше приймати 1 обʼєкт
export const registerUser = async (params: {
  email: string;
  password: string;
}): Promise<User> => {
  const { data } = await axiosInstance.post("/auth/register", params, {
    withCredentials: true,
  });
  return data;
};

export const loginUser = async (params: {
  email: string;
  password: string;
}): Promise<User> => {
  const { data } = await axiosInstance.post("/auth/login", params, {
    withCredentials: true,
  });
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
};

export const getProfile = async (): Promise<User> => {
  const { data } = await axiosInstance.get("/users/me", {
    withCredentials: true,
  });
  return data;
};
