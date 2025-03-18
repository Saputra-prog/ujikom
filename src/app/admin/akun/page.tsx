"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import { FiTrash2 } from "react-icons/fi";

interface User {
  id: number;
  username: string;
  email: string;
  noHp: number;
  alamat: string;
  role: string;
  createdAt: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/user`,
          { withCredentials: true }
        );
        setUsers(response.data.user);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal mengambil data user, silakan coba lagi.");
      }
    };

    fetchData();
  }, []);

  const hapusUser = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus akun ini?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/user/${id}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Gagal menghapus user:", err);
      setError("Gagal menghapus user, silakan coba lagi.");
    }
    alert("akun berhasil di hapus");
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-orange-400 via-white to-orange-400">
      <Sidebar />
      <div className="overflow-x-auto w-full max-w-5xl justify-center items-center ml-72 mr-8 mt-8">
        <h2 className="text-xl font-bold mb-4 text-center">Daftar Akun</h2>
        <table className="w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">No. HP</th>
              <th className="px-4 py-2 border">Alamat</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Dibuat</th>
              <th className="px-4 py-2 border">Hapus</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="text-center border-b hover:bg-gray-100"
              >
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.username}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.noHp}</td>
                <td className="px-4 py-2 border">{user.alamat}</td>
                <td className="px-4 py-2 border font-bold text-blue-600">
                  {user.role}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => hapusUser(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
