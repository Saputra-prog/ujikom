"use client";
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

function HomePage() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseURL = "https://xrzwvx14-4000.asse.devtunnels.ms";

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const url = `${baseURL}/api/produk`;
        const response = await axios.get(url, { withCredentials: true });
        console.log("Response:", response.data);

        const produkData = response.data.produk;
        if (Array.isArray(produkData)) {
          const produkWithDefaults = produkData.map(
            (item: any): Produk => ({
              id: item.id || 0,
              namaProduk: item.namaProduk || "Nama tidak tersedia",
              fotoProduk: item.fotoProduk || "/placeholder-image.png",
              hargaProduk: item.hargaProduk ?? 0,
              stokProduk: item.stokProduk ?? 0,
              createdAt: item.createdAt || "",
              updatedAt: item.updatedAt || "",
            })
          );
          setProdukList(produkWithDefaults);
        } else {
          setError("Data produk tidak valid.");
        }
      } catch (err) {
        console.error("Error fetching produk:", err);
        setError("Terjadi kesalahan saat mengambil data produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-5 bg-[#4DA1A9]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {produkList.map((produk) => (
          <div
            key={produk.id}
            className="bg-white border rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 hover:bg-blue-700"
          >
            <img
              src={`${baseURL}${produk.fotoProduk}`}
              alt={produk.namaProduk}
              onError={(e) => (e.currentTarget.src = "/placeholder-image.png")}
              className="w-full h-40 object-cover mb-3 rounded-lg"
            />
            <div className="-translate-x-20">
              <h3 className=" font-bold">{produk.namaProduk}</h3>
              <p className="text-orange-500 font-bold mb-1">
                Rp{produk.hargaProduk.toLocaleString("id-ID")}
              </p>
              <p className="text-gray-500">
                Stok:
                {produk.stokProduk > 0 ? produk.stokProduk : "Tidak tersedia"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
