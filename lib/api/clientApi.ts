// lib/api/clientApi.ts
"use client";

import { Note } from "@/types/note";
import { EditUserPayload } from "@/types/noteApi";
import { clientApi } from "./api";
import { User } from "@/types/user";

export interface CreateNoteValues {
  title: string;
  content?: string;
  tag:
    | "Work"
    | "Personal"
    | "Meeting"
    | "Shopping"
    | "Ideas"
    | "Travel"
    | "Finance"
    | "Health"
    | "Important"
    | "Todo";
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface SearchParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserData {
  username: string;
}

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> {
  const perPage = 12;
  const params: SearchParams = { page, perPage };

  if (search) params.search = search;
  if (tag) params.tag = tag;

  const res = await clientApi.get<NotesResponse>("/notes", { params });
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await clientApi.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(values: CreateNoteValues): Promise<Note> {
  const res = await clientApi.post<Note>("/notes", values);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await clientApi.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function registerUser(data: SignUpRequest): Promise<User> {
  const res = await clientApi.post<User>("/auth/register", data);
  return res.data;
}

export async function loginUser(data: LoginRequest): Promise<User> {
  const res = await clientApi.post<User>("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await clientApi.post("/auth/logout");
}

export async function checkSession(): Promise<User> {
  const res = await clientApi.get<User>("/auth/session");
  return res.data;
}

export async function getUserProfile(): Promise<User> {
  const res = await clientApi.get<User>("/users/me");
  return res.data;
}

export async function updateUserProfile(data: UpdateUserData): Promise<User> {
  const res = await clientApi.patch<User>("/users/me", data);
  return res.data;
}

export async function editUser(data: EditUserPayload): Promise<User> {
  const res = await clientApi.patch<User>("/users/me", data);
  return res.data;
}
