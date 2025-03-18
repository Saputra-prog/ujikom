"use client";
import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaTelegram } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { error } from "console";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  async function LOGIN() {
    const url = `${process.env.NEXT_PUBLIC_URL}/api/login`;
    try {
      const res = await axios.post(
        url,
        { username, password },
        { withCredentials: true }
      );
      console.log("Response API:", res.data);
      const userRole = res.data.user?.role;

      if (userRole === "admin") {
        push("/admin/home");
      } else if (userRole === "kasir") {
        push("/home");
      } else {
        alert("Role tidak dikenali!");
      }
    } catch (error) {
      console.error("Error saat login:", error);
      alert("Login gagal. Periksa kembali username dan password Anda.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center p-4 bg-gradient-to-r from-orange-400  to-white">
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-xl shadow-xl shadow-slate-600 p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-orange-600">
          Login
        </h1>

        <div className="space-y-4">
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nama
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan nama"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
        </div>

        <button
          className="w-full bg-orange-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          onClick={LOGIN}
        >
          LOGIN
        </button>
        {/* 
        <div className="flex items-center justify-center gap-4 mt-4">
          <FaGoogle className="text-red-500 text-2xl cursor-pointer hover:scale-110 transition-transform" />
          <FaFacebook className="text-blue-500 text-2xl cursor-pointer hover:scale-110 transition-transform" />
          <FaTelegram className="text-blue-400 text-2xl cursor-pointer hover:scale-110 transition-transform" />
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
