"use client";

import Sidebar from "@/components/sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Produk {
  id: number;
  namaProduk: string;
  fotoProduk: string;
  hargaProduk: number;
  stokProduk: number;
  createdAt: string;
  updatedAt: string;
}

function Page() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduk, setSelectedProduk] = useState<Produk | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_URL}/api/produk`;
        const response = await axios.get(url, { withCredentials: true });

        setProdukList(response.data.produk);
      } catch (err) {
        console.error("Error fetching produk:", err);
        setError("Terjadi kesalahan saat mengambil data produk.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduk();
  }, []);

  const hapusProduk = async (id: number) => {
    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menghapus produk ini?"
    );
    if (!konfirmasi) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/produk/${id}`, {
        withCredentials: true,
      });
      setProdukList(produkList.filter((produk) => produk.id !== id));
      alert("Produk berhasil dihapus!");
    } catch (err) {
      console.error("Gagal menghapus produk:", err);
      setError("Terjadi kesalahan saat menghapus produk.");
    }
  };

  const handleEdit = (produk: Produk) => {
    setSelectedProduk(produk);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedProduk) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/produk/${selectedProduk.id}`,
        selectedProduk,
        { withCredentials: true }
      );
      setProdukList(
        produkList.map((p) => (p.id === selectedProduk.id ? selectedProduk : p))
      );
      alert("Produk berhasil diperbarui!");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Gagal mengupdate produk:", err);
      setError("Terjadi kesalahan saat mengupdate produk.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-5 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ps-64">
          {produkList.map((produk) => (
            <div
              key={produk.id}
              className="bg-white border rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 hover:bg-[#2E5077]"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_URL}${produk.fotoProduk}`}
                alt={produk.namaProduk}
                className="w-full h-40 object-cover mb-3 rounded-lg"
              />
              <div className="text-start -translate-x-14">
                <h3 className="font-bold">{produk.namaProduk}</h3>
                <p className="text-orange-500 font-bold mb-1">
                  Rp{produk.hargaProduk.toLocaleString("id-ID")}
                </p>
                <p className="text-gray-500">
                  Stok:{" "}
                  {produk.stokProduk > 0 ? produk.stokProduk : "Tidak tersedia"}
                </p>
                <div className="flex space-x-2">
                  <button
                    className="p-2 rounded-lg bg-blue-500 text-white"
                    onClick={() => handleEdit(produk)}
                  >
                    Edit
                  </button>
                  <button
                    className="p-2 rounded-lg bg-red-500 text-white"
                    onClick={() => hapusProduk(produk.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProduk && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-3">Edit Produk</h2>
            <input
              type="text"
              className="w-full p-2 mb-2 border rounded"
              value={selectedProduk.namaProduk}
              onChange={(e) =>
                setSelectedProduk({
                  ...selectedProduk,
                  namaProduk: e.target.value,
                })
              }
            />
            <input
              type="any"
              className="w-full p-2 mb-2 border rounded"
              value={selectedProduk.hargaProduk}
              onChange={(e) =>
                setSelectedProduk({
                  ...selectedProduk,
                  hargaProduk: Number(e.target.value),
                })
              }
            />
            <input
              type="any"
              className="w-full p-2 mb-2 border rounded"
              value={selectedProduk.stokProduk}
              onChange={(e) =>
                setSelectedProduk({
                  ...selectedProduk,
                  stokProduk: Number(e.target.value),
                })
              }
            />
            <div className="flex space-x-2">
              <button
                className="p-2 bg-green-500 text-white rounded"
                onClick={handleUpdate}
              >
                Simpan
              </button>
              <button
                className="p-2 bg-gray-500 text-white rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
