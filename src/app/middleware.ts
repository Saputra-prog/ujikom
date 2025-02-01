import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // Ambil token login dari cookies
  const url = req.nextUrl.pathname; // Dapatkan URL saat ini

  // Jika pengguna belum login, cegah akses ke halaman tertentu
  if (!token && url !== "/login" && url !== "/register") {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect ke login
  }

  // Jika pengguna sudah login, cegah akses ke halaman login
  if (token && url === "/login") {
    return NextResponse.redirect(new URL("/home", req.url)); // Redirect ke home
  }

  return NextResponse.next(); // Izinkan navigasi normal
}

export const config = {
  matcher: ["/", "/login", "/dashboard", "/home"], // Halaman yang terkena middleware
};
