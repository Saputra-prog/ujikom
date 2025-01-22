"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook, FaTelegram } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState<any>();
  const [password, setPassword] = useState<any>();
  const { push } = useRouter();

  async function submitNCR() {
    const url = `${process.env.NEXT_PUBLIC_URL}/api/login`;
    try {
      // setIsLoading(true);
      const res = await axios.post(
        url,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      push("/home");
    } catch (error: any) {
      console.log(error);
      alert(error);
    }
  }
  return (
    <div>
      <main className="flex flex-col justify-center items-center min-h-screen bg-[#FEFFD2] pt-16">
        {/* <Image src="/logoHaikal.svg" alt="Logo" width={183} height={86} /> */}
        <div className="flex min-h-screen">
          <div className="bg-[#FFEEA9] rounded-lg shadow-lg w-full h-80 mt-4 ">
            <div className="w-[500px] h-auto p-4 border-2 border-[#FFEEA9] rounded-lg">
              <label
                htmlFor="nama"
                className="block text-sm font-medium text-gray-700"
              >
                Nama
              </label>
              <input
                id="username"
                type="nama"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              <div className="flex justify-center mt-4">
                <button
                  className="border px-2 py-2 rounded-lg bg-orange-600 flex justify-center text-white"
                  onClick={() => {
                    console.log(username, password);
                    submitNCR();
                  }}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
