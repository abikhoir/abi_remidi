const { db } = require("../config/database");

const AbsensiModel = {
  // GET semua data
  getAll: async () => {
    const [rows] = await db.execute(
      "SELECT * FROM absensi ORDER BY tanggal DESC, id DESC"
    );
    return rows;
  },

  // GET by ID
  getById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM absensi WHERE id = ?", [id]);
    return rows[0];
  },

  // CREATE data baru
  create: async (data) => {
    const [result] = await db.execute(
      "INSERT INTO absensi (nama, nim, tanggal, status, keterangan) VALUES (?, ?, ?, ?, ?)",
      [data.nama, data.nim, data.tanggal, data.status, data.keterangan || null]
    );
    return { id: result.insertId, ...data };
  },

  // UPDATE data
  update: async (id, data) => {
    const [result] = await db.execute(
      "UPDATE absensi SET nama = ?, nim = ?, tanggal = ?, status = ?, keterangan = ? WHERE id = ?",
      [
        data.nama,
        data.nim,
        data.tanggal,
        data.status,
        data.keterangan || null,
        id,
      ]
    );
    return result.affectedRows > 0;
  },

  // DELETE data
  delete: async (id) => {
    const [result] = await db.execute("DELETE FROM absensi WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },

  // SEARCH
  search: async (keyword) => {
    const [rows] = await db.execute(
      "SELECT * FROM absensi WHERE nama LIKE ? OR nim LIKE ? ORDER BY tanggal DESC",
      [`%${keyword}%`, `%${keyword}%`]
    );
    return rows;
  },

  // FILTER by status
  filterByStatus: async (status) => {
    const [rows] = await db.execute(
      "SELECT * FROM absensi WHERE status = ? ORDER BY tanggal DESC",
      [status]
    );
    return rows;
  },

  // FILTER by tanggal
  filterByDate: async (tanggal) => {
    const [rows] = await db.execute(
      "SELECT * FROM absensi WHERE tanggal = ? ORDER BY nama ASC",
      [tanggal]
    );
    return rows;
  },
};

module.exports = AbsensiModel;
