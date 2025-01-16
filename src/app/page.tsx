import Navbar from "@/components/navbar";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-slate-400 pb-2 z-0">
        <div className="ml-6 pt-6 flex flex-row justify-between mr-6">
          <div className="border bg-white w-56 h-64 rounded-lg"></div>
          <div className="border bg-white w-56 h-64 rounded-lg"></div>
          <div className="border bg-white w-56 h-64 rounded-lg"></div>
          <div className="border bg-white w-56 h-64 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default page;
