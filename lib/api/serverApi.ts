//lib/api/serverApi.ts
import { cookies } from "next/headers";
import axios from "axios";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { CheckSessionResult } from "@/types/noteApi";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export async function fetchServerNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const { data } = await serverApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await serverApi.get<CheckSessionResult>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await serverApi.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
