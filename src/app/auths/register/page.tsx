"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    noHp: "",
    alamat: "",
    role: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  async function submitRegistration() {
    try {
      setErrorMessage(null);

      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.noHp ||
        !formData.alamat
      ) {
        setErrorMessage("Semua field harus diisi.");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setErrorMessage("Format email tidak valid.");
        return;
      }

      if (formData.noHp.length < 5) {
        setErrorMessage("Nomor HP harus minimal 5 digit.");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          noHp: formData.noHp,
          alamat: formData.alamat,
          role: formData.role,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Registrasi berhasil:", response.data);
      alert("Registrasi berhasil!");
      router.push("/");
    } catch (error: any) {
      console.error("Error registrasi:", error.response?.data || error.message);

      if (error.response?.status === 409) {
        setErrorMessage(
          "Data sudah terdaftar. Gunakan username atau email lain."
        );
      } else {
        setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-white to-blue-400">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitRegistration();
        }}
        className="w-[500px] bg-white rounded-lg shadow-xl shadow-slate-600 p-6"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Tambah Akun</h1>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Nama Lengkap
        </label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />

        <label
          htmlFor="noHp"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Nomor HP
        </label>
        <input
          id="noHp"
          type="text"
          value={formData.noHp}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />

        <label
          htmlFor="alamat"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Alamat
        </label>
        <input
          id="alamat"
          type="text"
          value={formData.alamat}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />

        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />

        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />

        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Role
        </label>
        <select
          id="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Pilih Role
          </option>
          <option value="kasir">Kasir</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-400 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            BUAT AKUN
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
