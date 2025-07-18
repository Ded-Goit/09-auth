// lib/api/api.ts
import axios from "axios";

//  Клієнтський базовий URL: потрібен повний шлях
const clientBaseURL = process.env.NEXT_PUBLIC_API_URL;

if (!clientBaseURL) {
  throw new Error("❌ NEXT_PUBLIC_API_URL is not defined in your environment!");
}

//  Для запитів з браузера
export const clientApi = axios.create({
  baseURL: clientBaseURL + "/api",
  withCredentials: true,
});

//  Для запитів з сервера - використовуємо відносний шлях
export const serverApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
