"use client";

import Sidebar from "@/components/sidebar";
import axios from "axios";
import { useEffect, useState } from "react";

interface Produk {
  id: number;
  namaProduk: any;
  hargaProduk: number;
}

interface TransaksiProduk {
  id: number;
  transaksiId: number;
  produkId: number;
  jumlah: number;
  subTotal: number;
  produk: Produk;
}

interface Transaksi {
  id: number;
  userId: number;
  subTotal: number;
  transaksiproduks: TransaksiProduk[];
}

const TableComponent = () => {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/transaksi`,
          {
            withCredentials: true,
          }
        );
        setTransaksi(response.data);
      } catch (err) {
        console.error("Terjadi kesalahan saat mengambil data transaksi.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="overflow-x-auto w-full max-w-5xl justify-center items-center ml-72 mr-8 mt-8">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="border border-gray-300 p-2">NO</th>
              <th className="border border-gray-300 p-2">PESANAN</th>
              <th className="border border-gray-300 p-2">TOTAL HARGA</th>
              <th className="border border-gray-300 p-2">TOTAL BAYAR</th>
              <th className="border border-gray-300 p-2">KEMBALIAN</th>
              <th className="border border-gray-300 p-2">KODE TRANSAKSI</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  {item.transaksiproduks.map((tp) => (
                    <div key={tp.id}>
                      {tp.produk
                        ? `${tp.produk.namaProduk} (${tp.jumlah}x)`
                        : "Produk tidak ada"}
                    </div>
                  ))}
                </td>
                <td className="border border-gray-300 p-2">{item.subTotal}</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">-</td>
                <td className="border border-gray-300 p-2">{item.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
