import { NextResponse } from "next/server";

export function middleware(request) {
  const host = request.headers.get("host") ?? "";

  if (!host.startsWith("www.")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.host = host.slice(4);

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};