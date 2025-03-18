"use client";

import Sidebar from "@/components/sidebar";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Produk {
  id: number;
  namaProduk: string;
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
  totalBayar: number;
  kembalian: number;
  tanggalTransaksi: string;
}

const TableComponent = () => {
  const [allTransaksi, setAllTransaksi] = useState<Transaksi[]>([]);
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/transaksi`,
        {
          withCredentials: true,
        }
      );
      setAllTransaksi(response.data);
      setTransaksi(response.data);
    } catch (err) {
      console.error("Terjadi kesalahan saat mengambil data transaksi.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!allTransaksi.length) return;

    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-CA");
      console.log("Selected Date:", formattedDate);

      const filteredData = allTransaksi.filter((item) => {
        const itemDate = new Date(item.tanggalTransaksi).toLocaleDateString(
          "en-CA"
        );
        return itemDate === formattedDate;
      });

      setTransaksi([...filteredData]);
    } else {
      setTransaksi(allTransaksi);
    }
  }, [selectedDate, allTransaksi]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full max-w-5xl justify-center items-center ml-72 mr-8 mt-8">
        <div className="mb-4 relative">
          <button
            className="border p-2 bg-gray-200 hover:bg-gray-300"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            Pilih Tanggal
          </button>
          {showCalendar && (
            <div className="absolute mt-2 bg-white border shadow-lg p-2 z-10">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setShowCalendar(false);
                }}
                dateFormat="yyyy-MM-dd"
                inline
              />
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : transaksi.length === 0 ? (
          <p className="text-center text-gray-500">
            Tidak ada transaksi pada tanggal ini.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-orange-400 text-white">
                  <th className="border border-gray-300 p-2">NO</th>
                  <th className="border border-gray-300 p-2">PESANAN</th>
                  <th className="border border-gray-300 p-2">TOTAL HARGA</th>
                  <th className="border border-gray-300 p-2">TOTAL BAYAR</th>
                  <th className="border border-gray-300 p-2">KEMBALIAN</th>
                  <th className="border border-gray-300 p-2">
                    TANGGAL TRANSAKSI
                  </th>
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
                    <td className="border border-gray-300 p-2">
                      {item.subTotal}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.totalBayar}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.kembalian}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.tanggalTransaksi}
                    </td>
                    <td className="border border-gray-300 p-2">{item.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
