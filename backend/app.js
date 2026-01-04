const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const os = require("os");
require("dotenv").config();

const { testConnection } = require("./config/database");
const absensiRoutes = require("./routes/absensiRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0"; // ⬅️ Penting! Listen di semua network interfaces

// Fungsi untuk mendapatkan IP Address lokal
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
};

// Middleware CORS - Allow semua origin dari network lokal
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://192.168.100.105:3000", // ⬅️ Frontend di network
      `http://${getLocalIP()}:3000`, // ⬅️ Dynamic IP
      // Atau gunakan wildcard untuk development:
      /^http:\/\/192\.168\.\d+\.\d+:\d+$/, // Match semua IP 192.168.x.x
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging request dengan IP client
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString("id-ID");
  const clientIP = req.ip || req.connection.remoteAddress;
  console.log(`[${timestamp}] ${req.method} ${req.url} - from ${clientIP}`);
  next();
});

// Routes
app.use("/api/absensi", absensiRoutes);

// Root endpoint
app.get("/", (req, res) => {
  const localIP = getLocalIP();
  res.json({
    success: true,
    message: "🎓 API Absensi Mahasiswa",
    server: "Laragon 6 + phpMyAdmin",
    network: {
      local: `http://localhost:${PORT}`,
      network: `http://${localIP}:${PORT}`,
    },
    endpoints: {
      getAll: "GET /api/absensi",
      getById: "GET /api/absensi/:id",
      create: "POST /api/absensi",
      update: "PUT /api/absensi/:id",
      delete: "DELETE /api/absensi/:id",
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan server",
    error: err.message,
  });
});

// Start Server
const startServer = async () => {
  await testConnection();

  const localIP = getLocalIP();

  // ⬅️ Listen di HOST 0.0.0.0 agar bisa diakses dari network
  app.listen(PORT, HOST, () => {
    console.log("\n" + "═".repeat(55));
    console.log("🦁 LARAGON 6 - BACKEND ABSENSI MAHASISWA");
    console.log("═".repeat(55));
    console.log(`🚀 Local      : http://localhost:${PORT}`);
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    console.log(`🌐 Network    : http://${localIP}:${PORT}`);
    console.log(`📚 API Local  : http://localhost:${PORT}/api/absensi`);
    console.log(`📚 API Network: http://${localIP}:${PORT}/api/absensi`);
    console.log(`🗄️  Database   : absensi_db (phpMyAdmin)`);
    console.log("═".repeat(55));
    console.log("\n📱 Devices lain di jaringan bisa akses via Network URL\n");
  });
};

startServer();
