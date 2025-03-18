"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const disableNavbar = [
  "/",
  "/auths/register",
  "/admin/home",
  "/admin/riwayat",
  "/admin/akun",
  "/admin/tambahp",
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  if (disableNavbar.includes(pathname)) {
    return null;
  }

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (!confirmLogout) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/logout`);
      router.push("/");
    } catch (error) {
      console.error("Logout gagal", error);
    }
    alert("anda berhasil logout");
  };

  return (
    <nav className="bg-[#EB5B00] px-16 py-8 flex justify-between text-white fixed-top">
      <div>
        <Image
          src="/img/y.png"
          width={80}
          height={80}
          alt="logo kafe"
          className="bg-white rounded-full"
        />
      </div>
      <div className="flex gap-4 translate-y-3">
        <Link href="/home">
          <button
            className={`rounded-lg px-2 py-2 ${
              pathname === "/home" ? "border border-white" : "text-white"
            }`}
          >
            Beranda
          </button>
        </Link>
        <Link href="/makanan">
          <button
            className={`rounded-lg px-2 py-2 ${
              pathname === "/makanan" ? "border border-white" : "text-white"
            }`}
          >
            Daftar Makanan
          </button>
        </Link>
        <Link href="/minuman">
          <button
            className={`rounded-lg px-2 py-2 ${
              pathname === "/minuman" ? "border border-white" : "text-white"
            }`}
          >
            Daftar Minuman
          </button>
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="border rounded-lg px-2 border-white"
      >
        Logout
      </button>
    </nav>
  );
}
