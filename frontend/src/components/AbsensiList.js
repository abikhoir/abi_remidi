// src/components/AbsensiList.js - Retro updates
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import { motion } from "framer-motion";

const AbsensiList = ({ data, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "tanggal",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusBadge = (status) => {
    const statusStyles = {
      Hadir: "bg-green-100 text-green-800 border-green-200",
      Izin: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Sakit: "bg-orange-100 text-orange-800 border-orange-200",
      Alpha: "bg-red-100 text-red-800 border-red-200",
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="inline ml-1" />;
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="inline ml-1" />
    ) : (
      <FaSortDown className="inline ml-1" />
    );
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 retro-text-flicker">
        <motion.div
          className="text-gray-400 text-6xl mb-4 retro-filter"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          📋
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Belum ada data absensi
        </h3>
        <p className="text-gray-500 mb-6">
          Mulai tambahkan data absensi mahasiswa
        </p>
        <Link
          to="/tambah"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-none hover:bg-blue-700 transition-colors font-medium retro-button"
        >
          Tambah Absensi Pertama
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto crt relative">
      {/* Desktop Table */}
      <table className="hidden md:table w-full divide-y divide-var(--secondary-color)">
        <thead className="bg-gradient-to-r from-var(--accent-color) to-var(--secondary-color) text-white">
          <tr>
            <th className="px-6 py-4 text-left rounded-tl-none">No</th>
            <th
              className="px-6 py-4 text-left cursor-pointer retro-text-flicker"
              onClick={() => requestSort("nama")}
            >
              Nama {getSortIcon("nama")}
            </th>
            <th
              className="px-6 py-4 text-left cursor-pointer retro-text-flicker"
              onClick={() => requestSort("nim")}
            >
              NIM {getSortIcon("nim")}
            </th>
            <th
              className="px-6 py-4 text-left cursor-pointer retro-text-flicker"
              onClick={() => requestSort("tanggal")}
            >
              Tanggal {getSortIcon("tanggal")}
            </th>
            <th
              className="px-6 py-4 text-center cursor-pointer retro-text-flicker"
              onClick={() => requestSort("status")}
            >
              Status {getSortIcon("status")}
            </th>
            <th className="px-6 py-4 text-left retro-text-flicker">
              Keterangan
            </th>
            <th className="px-6 py-4 text-center rounded-tr-none retro-text-flicker">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-var(--secondary-color)">
          {paginatedData.map((item, index) => (
            <motion.tr
              key={item.id}
              className="hover:bg-blue-50/20 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <td className="px-6 py-4 font-medium text-var(--text-color)">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="px-6 py-4">
                <p className="font-semibold text-var(--text-color)">
                  {item.nama}
                </p>
              </td>
              <td className="px-6 py-4 text-var(--text-color)">{item.nim}</td>
              <td className="px-6 py-4 text-var(--text-color)">
                {formatDate(item.tanggal)}
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex px-3 py-1 rounded-none text-sm font-medium border ${getStatusBadge(
                    item.status
                  )} retro-filter`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-var(--text-color) max-w-xs truncate">
                {item.keterangan || "-"}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center space-x-2">
                  <Link
                    to={`/edit/${item.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-100/50 rounded-none transition-colors retro-button"
                    title="Edit"
                  >
                    <FaEdit size={18} />
                  </Link>
                  <button
                    onClick={() => onDelete(item)}
                    className="p-2 text-red-600 hover:bg-red-100/50 rounded-none transition-colors retro-button"
                    title="Hapus"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: pageCount }, (_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-none ${
              currentPage === index + 1
                ? "bg-var(--accent-color) text-black"
                : "bg-var(--bg-color) text-var(--text-color)"
            } hover:bg-var(--secondary-color) transition-colors retro-button`}
            whileHover={{ scale: 1.1 }}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginatedData.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-var(--bg-color) border border-var(--secondary-color) rounded-none p-4 shadow-[0_0_10px_var(--accent-color)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-var(--text-color) text-lg">
                  {item.nama}
                </p>
                <p className="text-sm text-var(--text-color)">
                  NIM: {item.nim}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-none text-sm font-medium border ${getStatusBadge(
                  item.status
                )} retro-filter`}
              >
                {item.status}
              </span>
            </div>
            <div className="text-sm text-var(--text-color) mb-3">
              <p>📅 {formatDate(item.tanggal)}</p>
              {item.keterangan && <p className="mt-1">📝 {item.keterangan}</p>}
            </div>
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-var(--secondary-color)">
              <Link
                to={`/edit/${item.id}`}
                className="flex items-center px-4 py-2 text-blue-600 bg-blue-50/20 rounded-none hover:bg-blue-100/50 transition-colors retro-button"
              >
                <FaEdit className="mr-1" />
                Edit
              </Link>
              <button
                onClick={() => onDelete(item)}
                className="flex items-center px-4 py-2 text-red-600 bg-red-50/20 rounded-none hover:bg-red-100/50 transition-colors retro-button"
              >
                <FaTrash className="mr-1" />
                Hapus
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AbsensiList;
