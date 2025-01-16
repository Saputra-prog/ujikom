"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Produk {
  id: number;
  namaProduk: string;
  fotoProduk: string; // Path relative
  hargaProduk: number;
  stokProduk: number;
  createdAt: string;
  updatedAt: string;
}

function HomePage() {
  const [produkList, setProdukList] = useState<Produk[]>([]); // Menyimpan daftar produk
  const [loading, setLoading] = useState(true); // Menyimpan status loading
  const [error, setError] = useState<string | null>(null); // Menyimpan pesan error

  const baseURL = "https://xrzwvx14-4000.asse.devtunnels.ms"; // Base URL API

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const url = `${baseURL}/api/produk`; // Endpoint API
        const response = await axios.get(url, { withCredentials: true });
        console.log("Response:", response.data);

        const produkData = response.data.produk;
        if (Array.isArray(produkData)) {
          // Map data untuk memastikan nilai default
          const produkWithDefaults = produkData.map(
            (item: any): Produk => ({
              id: item.id || 0,
              namaProduk: item.namaProduk || "Nama tidak tersedia",
              fotoProduk: item.fotoProduk || "/placeholder-image.png", // Path relative
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
    <div>
      <h1>Produk</h1>
      <div>
        {produkList.map((produk) => (
          <div
            key={produk.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{produk.namaProduk}</h3>
            <img
              src={`${baseURL}${produk.fotoProduk}`} // Gabungkan base URL dan path relative
              alt={produk.namaProduk}
              onError={
                (e) => (e.currentTarget.src = "/placeholder-image.png") // Placeholder jika gambar gagal dimuat
              }
              style={{ width: "150px", height: "150px" }}
            />
            <p>Harga: Rp{produk.hargaProduk}</p>
            <p>
              Stok:{" "}
              {produk.stokProduk > 0 ? produk.stokProduk : "Tidak tersedia"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
