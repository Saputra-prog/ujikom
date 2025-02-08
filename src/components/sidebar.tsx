"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
  const pathname = usePathname();

  return (
    <div>
      <nav className="bg-blue-400 w-64 h-screen flex flex-col p-4">
        <div className="flex justify-center">
          <img
            src={"/img/y.png"}
            width={60}
            height={60}
            alt="logo"
            className="bg-white rounded-full mb-2"
          />
        </div>
        <div className="space-y-2 text-white">
          <div className="rounded-lg">
            <Link
              href="/admin/home"
              className={`block px-4 py-3 rounded-lg transition duration-300 ${
                pathname === "/admin/home"
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              home
            </Link>
          </div>
          <div className=" rounded-lg">
            <Link
              href="/admin/tambahp"
              className={`block px-4 py-3 rounded-lg transition duration-300 ${
                pathname === "/admin/akun"
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              Tambah Produk
            </Link>
          </div>

          <div className=" rounded-lg">
            <Link
              href="/admin/riwayat"
              className={`block px-4 py-3 rounded-lg transition duration-300 ${
                pathname === "/admin/riwayat"
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              riwayat
            </Link>
          </div>

          <div className=" rounded-lg">
            <Link
              href="/auths/register"
              className={`block px-4 py-3 rounded-lg transition duration-300 ${
                pathname === "/auths/register"
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              tambah akun
            </Link>
          </div>
          <div className=" rounded-lg">
            <Link
              href="/admin/akun"
              className={`block px-4 py-3 rounded-lg transition duration-300 ${
                pathname === "/admin/akun"
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              akun pegawai
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
