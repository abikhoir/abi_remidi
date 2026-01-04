// src/components/Loading.js - Retro spinner
import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 retro-text-flicker">
      <motion.div
        className="rounded-full h-16 w-16 border-t-4 border-b-4 border-var(--accent-color) retro-filter"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      ></motion.div>
      <motion.p
        className="mt-4 text-var(--text-color) font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Memuat data...
      </motion.p>
    </div>
  );
};

export default Loading;
