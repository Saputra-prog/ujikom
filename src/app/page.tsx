"use client";
import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaTelegram } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();

  async function submitNCR() {
    const url = `${process.env.NEXT_PUBLIC_URL}/api/login`;
    try {
      const res = await axios.post(
        url,
        { username, password },
        { withCredentials: true }
      );
      push("/home");
    } catch (error) {
      alert("Login gagal. Periksa kembali username dan password Anda.");
    }
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center p-4 bg-gradient-to-r from-blue-400 via-slate-300 to-blue-400"
      // style={{ backgroundImage: "url('/img/kasir1.jpeg')" }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-xl shadow-xl shadow-slate-600 p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Login</h1>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          onClick={submitNCR}
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
