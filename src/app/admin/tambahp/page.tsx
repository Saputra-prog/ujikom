"use client";

import React, { useState } from "react";
import axios from "axios";
import Sidebar from "@/components/sidebar";

const tambahmenu = () => {
  const [produk, setProduk] = useState({
    namaProduk: "",
    fotoProduk: "",
    hargaProduk: "",
    deskripsiProduk: "",
    kategoriProduk: "",
    stokProduk: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setProduk((prev) => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setProduk((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("namaProduk", produk.namaProduk);
      formData.append("fotoProduk", produk.fotoProduk);
      formData.append("hargaProduk", produk.hargaProduk);
      formData.append("deskripsiProduk", produk.deskripsiProduk);
      formData.append("kategoriProduk", produk.kategoriProduk);
      formData.append("stokProduk", produk.stokProduk);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/produk`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Produk berhasil ditambahkan:", response.data);
      alert("Produk berhasil ditambahkan!");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menambahkan produk."
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex justify-center items-center w-full bg-gradient-to- from-orange-400 via-white to-orange-400 translate-x-48">
        <form
          onSubmit={handleSubmit}
          className="w-[500px] bg-orange-400 rounded-lg shadow-xl shadow-slate-600 p-6"
        >
          <h1 className="text-2xl font-bold text-center mb-4">Tambah Produk</h1>
          <label
            htmlFor="foto"
            className="block text-sm font-medium text-gray-700"
          >
            Foto Produk
          </label>
          <input
            type="file"
            name="fotoProduk"
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />

          <label
            htmlFor="namaProduk"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Nama Produk
          </label>
          <input
            type="string"
            name="namaProduk"
            value={produk.namaProduk}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />

          <label
            htmlFor="harga"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Harga Produk
          </label>
          <input
            type="any"
            name="hargaProduk"
            value={produk.hargaProduk}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />

          <label
            htmlFor="desk"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Deskripsi Produk
          </label>
          <input
            type="string"
            name="deskripsiProduk"
            value={produk.deskripsiProduk}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <div>
            <label
              htmlFor="kategori"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Kategori Produk
            </label>
            <select
              name="kategoriProduk"
              value={produk.kategoriProduk}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="desk"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Stok Produk
            </label>
            <input
              type="number"
              name="stokProduk"
              value={produk.stokProduk}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="border bg-white  text-black py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tambah Produk
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default tambahmenu;
