"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

interface Produk {
  id: number;
  namaProduk: string;
  fotoProduk: string;
  hargaProduk: number;
  stokProduk: number;
  createdAt: string;
  updatedAt: string;
  jumlah: number;
}

function HomePage() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Produk[]>([]);
  const [pembayaran, setPembayaran] = useState<number>(0);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_URL}/api/produk`;
        const response = await axios.get(url, { withCredentials: true });

        const produkData = response.data.produk;
        if (Array.isArray(produkData)) {
          const produkWithDefaults = produkData.map(
            (item: any): Produk => ({
              id: item.id || 0,
              namaProduk: item.namaProduk || "Nama tidak tersedia",
              fotoProduk: item.fotoProduk || "Foto tidak ada",
              hargaProduk: item.hargaProduk ?? 0,
              stokProduk: item.stokProduk ?? 0,
              createdAt: item.createdAt || "",
              updatedAt: item.updatedAt || "",
              jumlah: 1,
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

  const handlePesan = (produk: Produk) => {
    setSidebarVisible(true);

    setSelectedProducts((prev) => {
      const existingProduct = prev.find((p) => p.id === produk.id);
      if (existingProduct) {
        return prev.map((p) =>
          p.id === produk.id ? { ...p, jumlah: (p.jumlah || 1) + 1 } : p
        );
      } else {
        return [...prev, { ...produk, jumlah: 1 }];
      }
    });
  };

  const handleHapus = (id: number) => {
    setSelectedProducts((prev) => prev.filter((produk) => produk.id !== id));
  };

  const handleTambahJumlah = (id: number) => {
    setSelectedProducts((prev) =>
      prev.map((produk) =>
        produk.id === id
          ? { ...produk, jumlah: (produk.jumlah || 1) + 1 }
          : produk
      )
    );
  };

  const handleKurangJumlah = (id: number) => {
    setSelectedProducts((prev) =>
      prev
        .map((produk) =>
          produk.id === id
            ? { ...produk, jumlah: Math.max((produk.jumlah || 1) - 1, 1) }
            : produk
        )
        .filter((produk) => produk.jumlah > 0)
    );
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const kirimPesanan = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_URL}/api/transaksi`;
      const payload = {
        produk: selectedProducts.map((produk) => ({
          idProduk: produk.id,
          jumlah: produk.jumlah || 1,
        })),
      };

      const response = await axios.post(url, payload, {
        withCredentials: true,
      });

      console.log("Transaksi berhasil dikirim:", response.data);
    } catch (err) {
      console.error("Gagal mengirim transaksi:", err);
    }
  };

  const handlePrintStruk = async () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Struk Pembelian", 105, 10, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, 10, 20);

    doc.text("Detail Produk:", 10, 30);
    let yOffset = 40;

    selectedProducts.forEach((produk, index) => {
      doc.text(
        `${index + 1}. ${produk.namaProduk} (x${produk.jumlah || 1}) - Rp${(
          produk.hargaProduk * (produk.jumlah || 1)
        ).toLocaleString("id-ID")}`,
        10,
        yOffset
      );
      yOffset += 10;
    });

    yOffset += 10;
    doc.text(
      `Total Harga: Rp${totalHarga.toLocaleString("id-ID")}`,
      10,
      yOffset
    );
    yOffset += 10;
    doc.text(
      `Pembayaran: Rp${pembayaran.toLocaleString("id-ID")}`,
      10,
      yOffset
    );
    yOffset += 10;
    doc.text(
      `Kembalian: ${
        kembalian >= 0
          ? `Rp${kembalian.toLocaleString("id-ID")}`
          : "Pembayaran tidak cukup"
      }`,
      10,
      yOffset
    );

    doc.save("struk-pembelian.pdf");
    await kirimPesanan();
  };

  const totalHarga = selectedProducts.reduce(
    (total, produk) => total + produk.hargaProduk * (produk.jumlah || 1),
    0
  );

  const totalProduk = selectedProducts.reduce(
    (total, produk) => total + (produk.jumlah || 1),
    0
  );

  const kembalian = pembayaran - totalHarga;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`relative ${sidebarVisible ? "pr-80" : ""}`}>
      <div className="p-5 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
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
              <div
                className={`flex text-start flex-col ${
                  sidebarVisible ? "-translate-x-14" : "-translate-x-24"
                }`}
              >
                <h3 className="font-bold">{produk.namaProduk}</h3>
                <p className="text-orange-500 font-bold mb-1">
                  Rp{produk.hargaProduk.toLocaleString("id-ID")}
                </p>
                <p className="text-gray-500">
                  Stok:
                  {produk.stokProduk > 0 ? produk.stokProduk : "Tidak tersedia"}
                </p>
                <button
                  className="mt-2 px-2 py-1 bg-green-500 rounded-lg text-white"
                  onClick={() => handlePesan(produk)}
                >
                  Pesan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {sidebarVisible && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto">
          <div className="p-5">
            <h2 className="text-lg font-bold">Produk Terpilih</h2>
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded"
              onClick={closeSidebar}
            >
              Tutup
            </button>
            <div className="mt-5">
              {selectedProducts.map((produk) => (
                <div
                  key={produk.id}
                  className="flex items-center mb-4 border-b pb-2"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_URL}${produk.fotoProduk}`}
                    alt={produk.namaProduk}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-3">
                    <h3 className="font-bold">{produk.namaProduk}</h3>
                    <p className="text-orange-500">
                      Rp{produk.hargaProduk.toLocaleString("id-ID")}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        className="border border-black text-black px-2 py-1 rounded"
                        onClick={() => handleKurangJumlah(produk.id)}
                      >
                        -
                      </button>
                      <span className="mx-3">{produk.jumlah || 1}</span>
                      <button
                        className="border border-black text-black px-2 py-1 rounded"
                        onClick={() => handleTambahJumlah(produk.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleHapus(produk.id)}
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t pt-4">
              <div className="flex justify-between">
                <span className="font-bold">Total Produk:</span>
                <span>{totalProduk}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-bold">Total Harga:</span>
                <span>Rp{totalHarga.toLocaleString("id-ID")}</span>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-bold mb-1">
                  Masukkan Pembayaran:
                </label>
                <input
                  type="any"
                  className="w-full px-3 py-2 border rounded"
                  value={pembayaran}
                  onChange={(e) => setPembayaran(Number(e.target.value))}
                  placeholder="Masukkan jumlah pembayaran"
                />
              </div>
              <div className="mt-2">
                <span className="font-bold">Kembalian:</span>
                <span
                  className={`ml-2 ${
                    kembalian >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {kembalian >= 0
                    ? `Rp${kembalian.toLocaleString("id-ID")}`
                    : "Pembayaran tidak cukup"}
                </span>
              </div>
              <div className="mt-4">
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded"
                  onClick={handlePrintStruk}
                >
                  Print Struk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
