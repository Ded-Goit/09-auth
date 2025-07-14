import { cookies } from "next/headers";
import axiosInstance from "./api";
import { User } from "@/types/user";

export const getProfileServer = async (): Promise<User> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const { data } = await axiosInstance.get("/users/me", {
    headers: {
      Cookie: `accessToken=${token}`,
    },
  });

  return data;
};
