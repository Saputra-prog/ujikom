"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Navbar() {
  const pathname = usePathname();
  return (
    <div>
      <nav className="bg-[#2E5077] px-16 py-8 flex justify text-white fixed-top">
        <div>
          <Image
            src="/img/y.png"
            width={80}
            height={80}
            alt="logo kafe"
            className="bg-white rounded-full"
          />
        </div>
        <Link href="/home">
          <div className="hover:bg-[#4DA1A9] rounded-lg px-2 py-2">
            <button
              className={`rounded-lg px-2 py-2 ${
                pathname === "/" ? "bg-[#4DA1A9]" : "text-white"
              }`}
            >
              Home
            </button>
          </div>
        </Link>
        <Link href="/makanan">
          <div className="hover:bg-[#4DA1A9] rounded-lg px-2 py-2">
            <button
              className={`rounded-lg px-2 py-2 ${
                pathname === "/makanan" ? "bg-[#4DA1A9]" : "text-white"
              }`}
            >
              Daftar Makanan
            </button>
          </div>
        </Link>
        <Link href="/minuman">
          <div className="hover:bg-[#4DA1A9] rounded-lg px-2 py-2">
            <button
              className={`rounded-lg px-2 py-2 ${
                pathname === "/minuman" ? "bg-[#4DA1A9]" : "text-white"
              }`}
            >
              Daftar Minuman
            </button>
          </div>
        </Link>
        <Link href="/about">
          <div className="hover:bg-[#4DA1A9] rounded-lg px-2 py-2">
            <button
              className={`rounded-lg px-2 py-2 ${
                pathname === "/about" ? "bg-[#4DA1A9]" : "text-white"
              }`}
            >
              About
            </button>
          </div>
        </Link>
        <div className=" rounded-lg px-2 py-2 translate-x-[800%]">
          <button className="border rounded-lg px-2 py-2 bg-red-500">
            logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
