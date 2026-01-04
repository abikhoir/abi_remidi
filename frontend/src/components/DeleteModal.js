// src/components/DeleteModal.js - Retro updates
import React from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const DeleteModal = ({ isOpen, onClose, onConfirm, data }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 crt"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-var(--bg-color) border-4 border-var(--accent-color) rounded-none shadow-[0_0_20px_var(--secondary-color)] max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-var(--secondary-color)">
          <h3 className="text-lg font-semibold text-var(--text-color) retro-text-flicker">
            Konfirmasi Hapus
          </h3>
          <button
            onClick={onClose}
            className="text-var(--text-color) hover:text-var(--accent-color) transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>
        {/* Body */}
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <motion.div
              className="bg-red-100/20 p-4 rounded-none border-2 border-red-500"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 1 }}
            >
              <FaExclamationTriangle className="text-red-500 text-3xl retro-filter" />
            </motion.div>
          </div>
          <p className="text-center text-var(--text-color) mb-2">
            Apakah Anda yakin ingin menghapus data absensi:
          </p>
          {data && (
            <div className="bg-var(--bg-color) border border-var(--secondary-color) rounded-none p-4 mt-4">
              <p className="font-semibold text-var(--text-color)">
                {data.nama}
              </p>
              <p className="text-sm text-var(--text-color)">NIM: {data.nim}</p>
              <p className="text-sm text-var(--text-color)">
                Tanggal: {data.tanggal}
              </p>
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-4 border-t border-var(--secondary-color) bg-var(--bg-color) rounded-b-none">
          <motion.button
            onClick={onClose}
            className="px-4 py-2 text-var(--text-color) bg-var(--bg-color) border border-var(--secondary-color) rounded-none hover:bg-var(--secondary-color)/20 transition-colors font-medium retro-button"
            whileHover={{ scale: 1.05 }}
          >
            Batal
          </motion.button>
          <motion.button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-500 rounded-none hover:bg-red-600 transition-colors font-medium retro-button"
            whileHover={{ scale: 1.05 }}
          >
            Ya, Hapus
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteModal;
