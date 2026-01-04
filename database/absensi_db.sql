CREATE DATABASE absensi_db;
USE absensi_db;

CREATE TABLE absensi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    nim VARCHAR(50) NOT NULL,
    tanggal DATE NOT NULL,
    status ENUM('Hadir', 'Izin', 'Sakit', 'Alpha') NOT NULL,
    keterangan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO absensi (nama, nim, tanggal, status, keterangan) VALUES
('Ahmad Fauzi', '2024001', '2025-01-15', 'Hadir', NULL),
('Budi Santoso', '2024002', '2025-01-15', 'Hadir', NULL),
('Citra Dewi', '2024003', '2025-01-15', 'Sakit', 'Demam'),
('Diana Putri', '2024004', '2025-01-15', 'Izin', 'Acara keluarga'),
('Eko Prasetyo', '2024005', '2025-01-15', 'Alpha', NULL);