// middleware.ts

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";
import { parse } from "cookie";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;
  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPrivate) {
    if (!accessToken && refreshToken) {
      try {
        const apiRes = await checkSession();
        const setCookieHeader = apiRes.headers["set-cookie"];

        if (setCookieHeader) {
          const cookiesArray = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];

          for (const cookieStr of cookiesArray) {
            const parsed = parse(cookieStr);
            for (const [key, value] of Object.entries(parsed)) {
              if (
                ["accessToken", "refreshToken"].includes(key) &&
                typeof value === "string"
              ) {
                Cookie: cookieStore.toString();
              }
            }
          }
        }

        return NextResponse;
      } catch {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }

    if (!accessToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse;
  }

  if (isPublic) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (refreshToken) {
      try {
        const apiRes = await checkSession();
        const setCookieHeader = apiRes.headers["set-cookie"];

        if (setCookieHeader) {
          const cookiesArray = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];

          for (const cookieStr of cookiesArray) {
            const parsed = parse(cookieStr);
            for (const [key, value] of Object.entries(parsed)) {
              if (
                ["accessToken", "refreshToken"].includes(key) &&
                typeof value === "string"
              ) {
                Cookie: cookieStore.toString();
              }
            }
          }
        }

        return NextResponse.redirect(new URL("/", request.url));
      } catch {
        return NextResponse;
      }
    }

    return NextResponse;
  }

  return NextResponse;
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
