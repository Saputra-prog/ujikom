import React from "react";

function navbar() {
  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-500 to-white px-16 py-8 flex justify space-x-6 shadow-[3px_5px_4px] shadow-gray-500 z-10 relative">
        <button>logo</button>
        <button>Daftar Makanan</button>
        <button>Daftar Minuman</button>
        <button>Tentang kami</button>
      </nav>
    </div>
  );
}

export default navbar;
