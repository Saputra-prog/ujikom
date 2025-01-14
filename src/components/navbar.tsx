import React from "react";

function navbar() {
  return (
    <div>
      <nav className="px-8 py-8 flex justify-between bg-blue-400 text-black">
        <div>
          <span>logo</span>
        </div>
        <button className="space-x-3">
          <span>home</span>
          <span>menu</span>
          <span>promo</span>
        </button>
        <div>info meja</div>
      </nav>
    </div>
  );
}

export default navbar;
