const express = require("express");
const router = express.Router();
const AbsensiController = require("../controllers/absensiController");

// CRUD Routes
router.get("/", AbsensiController.getAll); // GET semua
router.get("/:id", AbsensiController.getById); // GET by ID
router.post("/", AbsensiController.create); // POST tambah
router.put("/:id", AbsensiController.update); // PUT update
router.delete("/:id", AbsensiController.delete); // DELETE hapus

module.exports = router;
