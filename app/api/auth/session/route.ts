//app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { logErrorResponse } from "../../_utils/utils";
import { isAxiosError } from "axios";

export const runtime = "edge"; // або не треба, якщо і так Edge

export async function GET() {
  try {
    const cookieStore = await cookies(); //  await
    const cookieHeader = cookieStore.toString();

    const res = await api.get("/auth/session", {
      headers: {
        Cookie: cookieHeader,
      },
    });

    const response = NextResponse.json(res.data, { status: res.status });

    const setCookieHeader = res.headers["set-cookie"];
    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];
      for (const cookieStr of cookiesArray) {
        response.headers.append("Set-Cookie", cookieStr);
      }
    }

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
