const mysql = require("mysql2");
require("dotenv").config();

// Koneksi ke MySQL Laragon
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "", // Laragon default kosong
  database: process.env.DB_NAME || "absensi_db",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

// Test koneksi
const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Terhubung ke MySQL Laragon (phpMyAdmin)!");
    console.log(`📦 Database: ${process.env.DB_NAME}`);
    connection.release();
  } catch (error) {
    console.error("❌ Gagal terhubung ke database:", error.message);
    console.log("\n📌 Pastikan:");
    console.log("   1. Laragon sudah running");
    console.log('   2. Database "absensi_db" sudah dibuat di phpMyAdmin');
    process.exit(1);
  }
};

module.exports = { db, testConnection };
