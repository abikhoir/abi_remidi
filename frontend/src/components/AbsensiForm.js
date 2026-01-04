// src/components/AbsensiForm.js - Updated with retro classes
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSave,
  FaArrowLeft,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const AbsensiForm = ({ initialData, onSubmit, isEdit }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    tanggal: new Date().toISOString().split("T")[0],
    status: "Hadir",
    keterangan: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.nama || "",
        nim: initialData.nim || "",
        tanggal: initialData.tanggal?.split("T")[0] || "",
        status: initialData.status || "Hadir",
        keterangan: initialData.keterangan || "",
      });
    }
  }, [initialData]);

  const validateField = (name, value) => {
    let error = "";
    if (name === "nama" && !value.trim()) error = "Nama wajib diisi";
    if (name === "nim" && !value.trim()) error = "NIM wajib diisi";
    if (name === "tanggal" && !value) error = "Tanggal wajib diisi";
    if (name === "status" && !value) error = "Status wajib dipilih";
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "keterangan") {
        newErrors[key] = validateField(key, formData[key]);
      }
    });
    setErrors(newErrors);
    setTouched({ nama: true, nim: true, tanggal: true, status: true });
    if (Object.values(newErrors).some((err) => err)) return;
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "Hadir", label: "Hadir", color: "bg-green-500" },
    { value: "Izin", label: "Izin", color: "bg-yellow-500" },
    { value: "Sakit", label: "Sakit", color: "bg-orange-500" },
    { value: "Alpha", label: "Alpha", color: "bg-red-500" },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 retro-filter"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Nama */}
      <div className="relative">
        <label className="block text-sm font-medium retro-text-flicker mb-2">
          Nama Mahasiswa <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Masukkan nama lengkap"
          className={`w-full px-4 py-3 border rounded-none focus:ring-0 transition-all retro-filter ${
            errors.nama && touched.nama
              ? "border-red-500 bg-red-50/50"
              : "border-gray-300"
          }`}
        />
        {touched.nama && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-3 top-10"
          >
            {errors.nama ? (
              <FaExclamationCircle className="text-red-500" />
            ) : (
              <FaCheckCircle className="text-green-500" />
            )}
          </motion.div>
        )}
        {errors.nama && touched.nama && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-500"
          >
            {errors.nama}
          </motion.p>
        )}
      </div>

      {/* Similar for NIM, Tanggal, Status, Keterangan - add retro-filter, rounded-none for square look, etc. */}
      {/* NIM */}
      <div className="relative">
        <label className="block text-sm font-medium retro-text-flicker mb-2">
          NIM <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nim"
          value={formData.nim}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Masukkan NIM"
          className={`w-full px-4 py-3 border rounded-none focus:ring-0 transition-all retro-filter ${
            errors.nim && touched.nim
              ? "border-red-500 bg-red-50/50"
              : "border-gray-300"
          }`}
        />
        {touched.nim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-3 top-10"
          >
            {errors.nim ? (
              <FaExclamationCircle className="text-red-500" />
            ) : (
              <FaCheckCircle className="text-green-500" />
            )}
          </motion.div>
        )}
        {errors.nim && touched.nim && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-500"
          >
            {errors.nim}
          </motion.p>
        )}
      </div>

      {/* Tanggal */}
      <div className="relative">
        <label className="block text-sm font-medium retro-text-flicker mb-2">
          Tanggal <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="tanggal"
          value={formData.tanggal}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 border rounded-none focus:ring-0 transition-all retro-filter ${
            errors.tanggal && touched.tanggal
              ? "border-red-500 bg-red-50/50"
              : "border-gray-300"
          }`}
        />
        {touched.tanggal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-3 top-10"
          >
            {errors.tanggal ? (
              <FaExclamationCircle className="text-red-500" />
            ) : (
              <FaCheckCircle className="text-green-500" />
            )}
          </motion.div>
        )}
        {errors.tanggal && touched.tanggal && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-500"
          >
            {errors.tanggal}
          </motion.p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium retro-text-flicker mb-2">
          Status Kehadiran <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statusOptions.map((option) => (
            <motion.label
              key={option.value}
              className={`flex items-center justify-center p-3 border-2 rounded-none cursor-pointer transition-all retro-button ${
                formData.status === option.value
                  ? `border-blue-500 bg-blue-50/50 ring-2 ring-blue-200`
                  : "border-gray-200 hover:border-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <input
                type="radio"
                name="status"
                value={option.value}
                checked={formData.status === option.value}
                onChange={handleChange}
                onBlur={handleBlur}
                className="sr-only"
              />
              <span
                className={`w-3 h-3 rounded-none ${option.color} mr-2 retro-filter`}
              ></span>
              <span className="font-medium text-gray-700">{option.label}</span>
            </motion.label>
          ))}
        </div>
        {errors.status && touched.status && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-500"
          >
            {errors.status}
          </motion.p>
        )}
      </div>

      {/* Keterangan */}
      <div>
        <label className="block text-sm font-medium retro-text-flicker mb-2">
          Keterangan (Opsional)
        </label>
        <textarea
          name="keterangan"
          value={formData.keterangan}
          onChange={handleChange}
          rows="3"
          placeholder="Tambahkan keterangan jika diperlukan..."
          className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-0 transition-all retro-filter resize-none"
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <motion.button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-none text-gray-700 hover:bg-gray-50 transition-colors font-medium retro-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </motion.button>
        <motion.button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-none hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed retro-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Menyimpan...
            </>
          ) : (
            <>
              <FaSave className="mr-2" />
              {isEdit ? "Update Data" : "Simpan Data"}
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default AbsensiForm;
