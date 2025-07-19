// middleware.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  //  Приватні сторінки
  if (isPrivate) {
    if (!accessToken && refreshToken) {
      try {
        const apiRes = await checkSession();
        const setCookieHeader = apiRes.headers["set-cookie"];

        if (setCookieHeader) {
          const response = NextResponse.next();
          const cookiesArray = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];

          for (const cookieStr of cookiesArray) {
            response.headers.append("Set-Cookie", cookieStr);
          }

          return response;
        }

        return NextResponse.next();
      } catch {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }

    if (!accessToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }

  //  Публічні сторінки
  if (isPublic) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (refreshToken) {
      try {
        const apiRes = await checkSession();
        const setCookieHeader = apiRes.headers["set-cookie"];

        if (setCookieHeader) {
          const response = NextResponse.redirect(new URL("/", request.url));
          const cookiesArray = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];

          for (const cookieStr of cookiesArray) {
            response.headers.append("Set-Cookie", cookieStr);
          }

          return response;
        }

        return NextResponse.redirect(new URL("/", request.url));
      } catch {
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  }

  //  Інші — пропускаємо
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
