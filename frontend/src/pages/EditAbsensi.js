// src/pages/EditAbsensi.js - Retro updates
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AbsensiForm from "../components/AbsensiForm";
import Loading from "../components/Loading";
import { getAbsensiById, updateAbsensi } from "../services/api";
import { motion } from "framer-motion";

const EditAbsensi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAbsensiById(id);
        setInitialData(response.data);
      } catch (err) {
        setError("Data tidak ditemukan");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateAbsensi(id, formData);
      alert("Data absensi berhasil diupdate!");
      navigate("/");
    } catch (error) {
      alert("Gagal mengupdate data: " + (error.message || "Unknown error"));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-var(--bg-color) flex items-center justify-center crt">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-var(--bg-color) flex items-center justify-center crt">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-red-600 text-xl mb-4 retro-text-flicker">
            {error}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-none hover:bg-blue-700 retro-button"
          >
            Kembali ke Home
          </button>
        </motion.div>
      </div>
    );
  }

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
              ✏️ Edit Absensi
            </h1>
            <p className="text-white mt-1">Perbarui data absensi mahasiswa</p>
          </div>
          {/* Form */}
          <div className="p-6">
            <AbsensiForm
              initialData={initialData}
              onSubmit={handleSubmit}
              isEdit={true}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditAbsensi;
