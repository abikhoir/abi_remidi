// src/App.js - Add crt class if needed
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TambahAbsensi from "./pages/TambahAbsensi";
import EditAbsensi from "./pages/EditAbsensi";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-var(--bg-color) crt">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tambah" element={<TambahAbsensi />} />
          <Route path="/edit/:id" element={<EditAbsensi />} />
        </Routes>
        {/* Footer */}
        <footer className="bg-gradient-to-r from-var(--accent-color) to-var(--secondary-color) text-white py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-white retro-text-flicker">
              © 2025 Absensi Mahasiswa - Remedial Project
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
