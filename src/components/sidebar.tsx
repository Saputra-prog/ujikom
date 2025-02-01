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
        <div className="space-y-2">
          <div className="rounded-lg">
            <Link
              href="/admin/home"
              className={`block px-4 py-3 rounded-lg transition duration-300 ${
                pathname === "/admin/home" ? "bg-white" : "hover:bg-white"
              }`}
            >
              home
            </Link>
          </div>

          <div className=" rounded-lg">
            <Link
              href="/admin/riwayat"
              className={`block px-4 py-3 rounded-lg transition duration-300 ${
                pathname === "/admin/riwayat" ? "bg-white" : "hover:bg-white"
              }`}
            >
              riwayat
            </Link>
          </div>

          <div className=" rounded-lg">
            <Link
              href="/auths/register"
              className={`block px-4 py-3 rounded-lg transition duration-300 ${
                pathname === "/auths/register" ? "bg-white" : "hover:bg-white"
              }`}
            >
              tambah akun
            </Link>
          </div>
          <div className=" rounded-lg">
            <Link
              href="/admin/akun"
              className={`block px-4 py-3 rounded-lg transition duration-300 ${
                pathname === "/auths/register" ? "bg-white" : "hover:bg-white"
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
