const AbsensiModel = require("../models/absensiModel");

const AbsensiController = {
  // GET - Semua data
  getAll: async (req, res) => {
    try {
      const { search, status, tanggal } = req.query;
      let data;

      if (search) {
        data = await AbsensiModel.search(search);
      } else if (status) {
        data = await AbsensiModel.filterByStatus(status);
      } else if (tanggal) {
        data = await AbsensiModel.filterByDate(tanggal);
      } else {
        data = await AbsensiModel.getAll();
      }

      res.json({
        success: true,
        message: "Data berhasil diambil",
        count: data.length,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data",
        error: error.message,
      });
    }
  },

  // GET - By ID
  getById: async (req, res) => {
    try {
      const data = await AbsensiModel.getById(req.params.id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Data tidak ditemukan",
        });
      }

      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal mengambil data",
        error: error.message,
      });
    }
  },

  // POST - Tambah data
  create: async (req, res) => {
    try {
      const { nama, nim, tanggal, status, keterangan } = req.body;

      // Validasi
      if (!nama || !nim || !tanggal || !status) {
        return res.status(400).json({
          success: false,
          message: "Nama, NIM, tanggal, dan status wajib diisi",
        });
      }

      const validStatus = ["Hadir", "Izin", "Sakit", "Alpha"];
      if (!validStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status tidak valid",
        });
      }

      const newData = await AbsensiModel.create({
        nama,
        nim,
        tanggal,
        status,
        keterangan,
      });

      res.status(201).json({
        success: true,
        message: "Data berhasil ditambahkan",
        data: newData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal menambahkan data",
        error: error.message,
      });
    }
  },

  // PUT - Update data
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, nim, tanggal, status, keterangan } = req.body;

      // Cek data exists
      const existing = await AbsensiModel.getById(id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: "Data tidak ditemukan",
        });
      }

      // Validasi
      if (!nama || !nim || !tanggal || !status) {
        return res.status(400).json({
          success: false,
          message: "Nama, NIM, tanggal, dan status wajib diisi",
        });
      }

      await AbsensiModel.update(id, { nama, nim, tanggal, status, keterangan });
      const updatedData = await AbsensiModel.getById(id);

      res.json({
        success: true,
        message: "Data berhasil diupdate",
        data: updatedData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal mengupdate data",
        error: error.message,
      });
    }
  },

  // DELETE - Hapus data
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      // Cek data exists
      const existing = await AbsensiModel.getById(id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: "Data tidak ditemukan",
        });
      }

      await AbsensiModel.delete(id);

      res.json({
        success: true,
        message: "Data berhasil dihapus",
        data: existing,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal menghapus data",
        error: error.message,
      });
    }
  },
};

module.exports = AbsensiController;
