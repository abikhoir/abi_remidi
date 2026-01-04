// src/pages/Home.js - Retro updates
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaSync } from "react-icons/fa";
import AbsensiList from "../components/AbsensiList";
import DeleteModal from "../components/DeleteModal";
import Loading from "../components/Loading";
import { getAllAbsensi, deleteAbsensi } from "../services/api";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Home = () => {
  const [absensi, setAbsensi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, data: null });
  const [notification, setNotification] = useState(null);

  const fetchAbsensi = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (filterStatus) params.status = filterStatus;
      if (filterDate) params.tanggal = filterDate;
      const response = await getAllAbsensi(params);
      setAbsensi(response.data || []);
    } catch (err) {
      setError("Gagal memuat data. Pastikan backend sudah berjalan.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterStatus, filterDate]);

  useEffect(() => {
    fetchAbsensi();
  }, [fetchAbsensi]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = async () => {
    try {
      await deleteAbsensi(deleteModal.data.id);
      setAbsensi((prev) =>
        prev.filter((item) => item.id !== deleteModal.data.id)
      );
      showNotification("Data berhasil dihapus!", "success");
    } catch (err) {
      showNotification("Gagal menghapus data!", "error");
    } finally {
      setDeleteModal({ isOpen: false, data: null });
    }
  };

  const openDeleteModal = (item) => {
    setDeleteModal({ isOpen: true, data: item });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterStatus("");
    setFilterDate("");
  };

  const stats = {
    total: absensi.length,
    hadir: absensi.filter((a) => a.status === "Hadir").length,
    izin: absensi.filter((a) => a.status === "Izin").length,
    sakit: absensi.filter((a) => a.status === "Sakit").length,
    alpha: absensi.filter((a) => a.status === "Alpha").length,
  };

  const chartData = [
    { name: "Hadir", value: stats.hadir, fill: "#22c55e" },
    { name: "Izin", value: stats.izin, fill: "#eab308" },
    { name: "Sakit", value: stats.sakit, fill: "#f97316" },
    { name: "Alpha", value: stats.alpha, fill: "#ef4444" },
  ];

  return (
    <div className="min-h-screen bg-var(--bg-color) crt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notification */}
        {notification && (
          <motion.div
            className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-none shadow-[0_0_10px_var(--accent-color)] ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            } retro-text-flicker`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            {notification.message}
          </motion.div>
        )}
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-var(--font-retro) text-var(--text-color) retro-text-flicker">
              📚 Data Absensi Mahasiswa
            </h1>
            <p className="text-var(--text-color) mt-1">
              Kelola data kehadiran mahasiswa
            </p>
          </div>
          <Link
            to="/tambah"
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-var(--accent-color) text-black rounded-none hover:bg-var(--secondary-color) transition-colors font-medium shadow-[0_0_10px_var(--text-color)] hover:shadow-[0_0_20px_var(--text-color)] retro-button"
          >
            <FaPlus className="mr-2" />
            Tambah Absensi
          </Link>
        </motion.div>
        {/* Chart Stats */}
        <motion.div
          className="bg-var(--bg-color) border-2 border-var(--secondary-color) shadow-[0_0_15px_var(--accent-color)] p-6 mb-8 rounded-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-var(--font-retro) text-var(--text-color) mb-4 retro-text-flicker">Statistik Absensi</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="var(--text-color)" />
              <YAxis stroke="var(--text-color)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--bg-color)", border: '1px solid var(--secondary-color)' }} />
              <Bar dataKey="value" radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        {/* Filters */}
        <motion.div
          className="bg-var(--bg-color) border-2 border-var(--accent-color) shadow-[0_0_10px_var(--secondary-color)] p-4 mb-6 rounded-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-var(--text-color)" />
              <input
                type="text"
                placeholder="Cari nama atau NIM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-var(--secondary-color) rounded-none focus:ring-0 dark:bg-#111 dark:text-var(--text-color) retro-filter"
              />
            </div>
            {/* Filter Status */}
            <div className="sm:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-var(--secondary-color) rounded-none focus:ring-0 dark:bg-#111 dark:text-var(--text-color) retro-filter"
              >
                <option value="">Semua Status</option>
                <option value="Hadir">Hadir</option>
                <option value="Izin">Izin</option>
                <option value="Sakit">Sakit</option>
                <option value="Alpha">Alpha</option>
              </select>
            </div>
            {/* Filter Date */}
            <div className="sm:w-48">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-4 py-2 border border-var(--secondary-color) rounded-none focus:ring-0 dark:bg-#111 dark:text-var(--text-color) retro-filter"
              />
            </div>
            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="flex items-center justify-center px-4 py-2 text-var(--text-color) bg-var(--bg-color) border border-var(--secondary-color) rounded-none hover:bg-var(--secondary-color)/20 transition-colors retro-button"
            >
              <FaSync className="mr-2" />
              Reset
            </button>
          </div>
        </motion.div>
        {/* Content */}
        <motion.div
          className="bg-var(--bg-color) border-2 border-var(--accent-color) shadow-[0_0_15px_var(--secondary-color)] overflow-hidden rounded-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-400 text-5xl mb-4 retro-text-flicker">⚠️</div>
              <p className="text-red-600 font-medium dark:text-red-400 retro-text-flicker">{error}</p>
              <button
                onClick={fetchAbsensi}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-none hover:bg-blue-700 retro-button"
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <AbsensiList data={absensi} onDelete={openDeleteModal} />
          )}
        </motion.div>
        {/* Delete Modal */}
        <DeleteModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, data: null })}
          onConfirm={handleDelete}
          data={deleteModal.data}
        />
      </div>
    </div>
  );
};

export default Home;