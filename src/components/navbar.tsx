import Link from "next/link";
import React from "react";

function navbar() {
  return (
    <div>
      <nav className="bg-[#2E5077] px-16 py-8 flex justify space-x-6 z-10 relative text-white">
        <span>logo</span>
        <Link href="/makanan">
          <button>Daftar Makanan</button>
        </Link>
        <Link href={"/minuman"}>
          <button>Daftar Minuman</button>
        </Link>
        <Link href={"/about"}>
          <button>Tentang kami</button>
        </Link>
      </nav>
    </div>
  );
}

export default navbar;
