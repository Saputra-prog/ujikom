"use client";

import Sidebar from "@/components/sidebar";
import React from "react";

function page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="bg-orange-500"></div>
    </div>
  );
}

export default page;
