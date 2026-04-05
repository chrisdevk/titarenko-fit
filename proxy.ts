import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  if (response) {
    return response;
  }

  const token = request.cookies.get("payload-token")?.value;

  const pathname = request.nextUrl.pathname;

  const isDashboard = /^\/(en|ru)\/dashboard(\/|$)/.test(pathname);

  if (isDashboard && !token) {
    const locale = pathname.match(/^\/(en|ru)/)?.[1] || "ru";
    return NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(en|ru)", "/(en|ru)/:path*", "/(en|ru)/dashboard/:path*"],
};
