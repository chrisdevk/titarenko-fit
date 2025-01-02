import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  if (response) {
    return response;
  }

  const token = request.cookies.get("payload-token")?.value;

  const pathname = request.nextUrl.pathname;

  const isDashboard = /^\/(en|de)\/dashboard(\/|$)/.test(pathname);
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(en|ru)", "/(en|ru)/:path*", "/(en|ru)/dashboard/:path*"],
};
