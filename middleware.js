import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;

  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/login/LoginPage";

  if (loggedInUserNotAccessPaths) {
    //accessing not secured routes
    if (authToken) {
      return NextResponse.redirect(new URL("/Admin/AdminPage", request.url));
    }
  } else {
    if (!authToken) {
      //accessing secured routes
      return NextResponse.redirect(new URL("/login/LoginPage", request.url));
    }
  }
}

export const config = {
  matcher: [],
};
// "/form/:path*"
