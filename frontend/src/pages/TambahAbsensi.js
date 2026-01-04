// src/pages/TambahAbsensi.js - Retro updates
import React from "react";
import { useNavigate } from "react-router-dom";
import AbsensiForm from "../components/AbsensiForm";
import { createAbsensi } from "../services/api";
import { motion } from "framer-motion";

const TambahAbsensi = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createAbsensi(formData);
      alert("Data absensi berhasil ditambahkan!");
      navigate("/");
    } catch (error) {
      alert("Gagal menambahkan data: " + (error.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-var(--bg-color) py-8 crt">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-var(--bg-color) border-4 border-var(--accent-color) shadow-[0_0_20px_var(--secondary-color)] overflow-hidden rounded-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-var(--accent-color) to-var(--secondary-color) px-6 py-8">
            <h1 className="text-2xl font-var(--font-retro) text-white retro-text-flicker">
              ➕ Tambah Absensi
            </h1>
            <p className="text-white mt-1">
              Isi form berikut untuk menambah data absensi baru
            </p>
          </div>
          {/* Form */}
          <div className="p-6">
            <AbsensiForm onSubmit={handleSubmit} isEdit={false} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TambahAbsensi;
