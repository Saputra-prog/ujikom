"use client";

import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (!confirmLogout) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/logout`);
      localStorage.removeItem("token");
      alert("Anda berhasil logout");
      router.push("/");
    } catch (error) {
      console.error("Logout gagal", error);
    }
  };

  return (
    <div>
      <nav className="bg-orange-400 w-64 h-[100vh] fixed flex flex-col p-4">
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
          <Link
            href="/admin/home"
            className={`block px-4 py-3 rounded-lg transition duration-300 ${
              pathname === "/admin/home"
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }`}
          >
            Beranda
          </Link>
          <Link
            href="/admin/tambahp"
            className={`block px-4 py-3 rounded-lg transition duration-300 ${
              pathname === "/admin/tambahp"
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }`}
          >
            Tambah Produk
          </Link>
          <Link
            href="/admin/riwayat"
            className={`block px-4 py-3 rounded-lg transition duration-300 ${
              pathname === "/admin/riwayat"
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }`}
          >
            Riwayat
          </Link>
          <Link
            href="/auths/register"
            className={`block px-4 py-3 rounded-lg transition duration-300 ${
              pathname === "/auths/register"
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }`}
          >
            Tambah Akun
          </Link>
          <Link
            href="/admin/akun"
            className={`block px-4 py-3 rounded-lg transition duration-300 ${
              pathname === "/admin/akun"
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }`}
          >
            Akun Pegawai
          </Link>
          <div className="rounded-lg mt-2">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-3 rounded-lg border border-white hover:bg-white hover:text-black"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
