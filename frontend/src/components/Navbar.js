// src/components/Navbar.js - Retro updates
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserGraduate,
  FaHome,
  FaPlus,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-var(--accent-color) to-var(--secondary-color) shadow-[0_0_20px_var(--text-color)] sticky top-0 z-50 dark:from-#222 dark:to-#111">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaUserGraduate className="text-white text-2xl retro-filter" />
            <span className="text-white font-var(--font-retro) text-xl hidden sm:block retro-text-flicker">
              Absensi Mahasiswa
            </span>
            <span className="text-white font-var(--font-retro) text-lg sm:hidden retro-text-flicker">
              Absensi
            </span>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-4 py-2 rounded-none transition-all duration-200 retro-button ${
                isActive("/")
                  ? "bg-white text-var(--accent-color) font-semibold"
                  : "text-white hover:bg-var(--secondary-color)"
              }`}
            >
              <FaHome />
              <span>Home</span>
            </Link>
            <Link
              to="/tambah"
              className={`flex items-center space-x-1 px-4 py-2 rounded-none transition-all duration-200 retro-button ${
                isActive("/tambah")
                  ? "bg-white text-var(--accent-color) font-semibold"
                  : "text-white hover:bg-var(--secondary-color)"
              }`}
            >
              <FaPlus />
              <span>Tambah Absensi</span>
            </Link>
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-white hover:bg-var(--secondary-color) rounded-none transition-colors retro-button"
              whileHover={{ scale: 1.1 }}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-white hover:bg-var(--secondary-color) rounded-none transition-colors retro-button"
              whileHover={{ scale: 1.1 }}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.button>
            <button
              onClick={toggleMenu}
              className="text-white p-2 rounded-none hover:bg-var(--secondary-color) transition-colors retro-button"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={toggleMenu}
                className={`flex items-center space-x-2 px-4 py-3 rounded-none transition-all retro-button ${
                  isActive("/")
                    ? "bg-white text-var(--accent-color) font-semibold"
                    : "text-white hover:bg-var(--secondary-color)"
                }`}
              >
                <FaHome />
                <span>Home</span>
              </Link>
              <Link
                to="/tambah"
                onClick={toggleMenu}
                className={`flex items-center space-x-2 px-4 py-3 rounded-none transition-all retro-button ${
                  isActive("/tambah")
                    ? "bg-white text-var(--accent-color) font-semibold"
                    : "text-white hover:bg-var(--secondary-color)"
                }`}
              >
                <FaPlus />
                <span>Tambah Absensi</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
