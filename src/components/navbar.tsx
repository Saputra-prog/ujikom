"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const disableNavbar = [
  "/",
  "/auths/register",
  "/admin/home",
  "/admin/riwayat",
  "/admin/akun",
  "/admin/tambahp",
];

export default function Navbar() {
  const pathname = usePathname();

  // Sembunyikan navbar jika halaman ada di dalam disableNavbar
  if (disableNavbar.includes(pathname)) {
    return null;
  }

  return (
    <div>
      <nav className="bg-[#2E5077] px-16 py-8 flex justify-between text-white fixed-top">
        <div>
          <Image
            src="/img/y.png"
            width={80}
            height={80}
            alt="logo kafe"
            className="bg-white rounded-full"
          />
        </div>
        <div className="flex gap-4">
          <Link href="/home">
            <button
              className={`rounded-lg px-2 py-2 ${
                pathname === "/home" ? "bg-[#4DA1A9]" : "text-white"
              }`}
            >
              Home
            </button>
          </Link>
          <Link href="/makanan">
            <button
              className={`rounded-lg px-2 py-2 ${
                pathname === "/makanan" ? "bg-[#4DA1A9]" : "text-white"
              }`}
            >
              Daftar Makanan
            </button>
          </Link>
          <Link href="/minuman">
            <button
              className={`rounded-lg px-2 py-2 ${
                pathname === "/minuman" ? "bg-[#4DA1A9]" : "text-white"
              }`}
            >
              Daftar Minuman
            </button>
          </Link>
          <Link href="/about">
            <button
              className={`rounded-lg px-2 py-2 ${
                pathname === "/about" ? "bg-[#4DA1A9]" : "text-white"
              }`}
            >
              About
            </button>
          </Link>
        </div>
        <Link href="/">
          <button className="border rounded-lg px-2 py-2 bg-red-500">
            Logout
          </button>
        </Link>
      </nav>
    </div>
  );
}
