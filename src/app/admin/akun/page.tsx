"use client";

import Sidebar from "@/components/sidebar";
import React from "react";

const TableComponent = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="overflow-x-auto flex items-center ml-80 -translate-y-60">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="border border-gray-300 p-2">NO</th>
              <th className="border border-gray-300 p-2">NAMA</th>
              <th className="border border-gray-300 p-2">NO HP</th>
              <th className="border border-gray-300 p-2">ALAMAT</th>
              <th className="border border-gray-300 p-2">EMAIL</th>
              <th className="border border-gray-300 p-2">PASSWORD</th>
              <th className="border border-gray-300 p-2">ROLE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">-</td>
              <td className="border border-gray-300 p-2">-</td>
              <td className="border border-gray-300 p-2">-</td>
              <td className="border border-gray-300 p-2">-</td>
              <td className="border border-gray-300 p-2">-</td>
              <td className="border border-gray-300 p-2">-</td>
              <td className="border border-gray-300 p-2">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
