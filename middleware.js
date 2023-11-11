import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("hello");
  const authToken = request.cookies.get("authToken")?.value;
  console.log(authToken);

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
  matcher: ["/login/:path*", "/Admin/:path*", "/form/:path*"],
};
