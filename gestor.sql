-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 25, 2025 at 08:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestor`
--

-- --------------------------------------------------------

--
-- Table structure for table `actividades`
--

CREATE TABLE `actividades` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `actividades`
--

INSERT INTO `actividades` (`id`, `nombre`, `categoria_id`) VALUES
(1, 'Lectura', 1),
(2, 'Ejercicio físico', 2),
(3, 'Investigación', 1),
(4, 'Reuniones de trabajo', 3),
(5, 'programar', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(2, 'Deporte'),
(1, 'Estudio'),
(3, 'Trabajo');

-- --------------------------------------------------------

--
-- Table structure for table `habitos`
--

CREATE TABLE `habitos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `actividad_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `habitos`
--

INSERT INTO `habitos` (`id`, `nombre`, `actividad_id`) VALUES
(1, 'Leer 30 minutos diarios', 1),
(2, 'Correr 5 km', 2),
(3, 'Investigar 1 artículo científico', 3),
(4, 'Asistir a reuniones semanales', 4),
(5, 'Ver clases de programacion', 5);

-- --------------------------------------------------------

--
-- Table structure for table `proyectos`
--

CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `proyectos`
--

INSERT INTO `proyectos` (`id`, `nombre`) VALUES
(3, 'Base de datos'),
(2, 'Electricidad'),
(1, 'Matematica'),
(4, 'Programacion');

-- --------------------------------------------------------

--
-- Table structure for table `proyecto_actividad`
--

CREATE TABLE `proyecto_actividad` (
  `id` int(11) NOT NULL,
  `proyecto_id` int(11) NOT NULL,
  `actividad_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `proyecto_actividad`
--

INSERT INTO `proyecto_actividad` (`id`, `proyecto_id`, `actividad_id`) VALUES
(1, 1, 1),
(2, 2, 3),
(3, 3, 3),
(4, 4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `password` text NOT NULL,
  `role` enum('ADMIN','BASICO') NOT NULL DEFAULT 'BASICO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `email`, `telefono`, `direccion`, `password`, `role`) VALUES
(1, 'Gustavo', 'Gustavo Alberto', 'gustavoalberto@uvm.edu.ve', '0412-1728092', 'Plata III', '$2b$10$onrflAaNrSGB1vuLkeSOBOS9JtHXG.l3aMTj9.pJOrSKD37RdeYBi', 'BASICO'),
(2, 'Jose', 'Jose Perdomo', 'jperdomo@uvm.edu.ve', '0414-7536916', 'Escuque', '$2b$10$onrflAaNrSGB1vuLkeSOBOS9JtHXG.l3aMTj9.pJOrSKD37RdeYBi', 'BASICO'),
(3, 'Sezar', 'Sezar Cánovas', 'sezar248@uvm.edu.ve', '0414-9752689', 'La Puerta', '$2b$10$onrflAaNrSGB1vuLkeSOBOS9JtHXG.l3aMTj9.pJOrSKD37RdeYBi', 'BASICO'),
(4, 'ViniJr', 'Vinicius Jr', 'vinicius_halamadrid@uvm.edu.ve', '+34913984300', 'Madrid', '$2b$10$onrflAaNrSGB1vuLkeSOBOS9JtHXG.l3aMTj9.pJOrSKD37RdeYBi', 'BASICO'),
(5, 'Glorimar', 'Glorimar Maldonado', 'glori.maldonado@uvm.edu.ve', '0424-7387023', 'Carvajal', '$2b$10$onrflAaNrSGB1vuLkeSOBOS9JtHXG.l3aMTj9.pJOrSKD37RdeYBi', 'ADMIN'),
(6, 'dani', 'dani', 'dani@proton.me', '0412000000', 'Caracas', '$2b$10$onrflAaNrSGB1vuLkeSOBOS9JtHXG.l3aMTj9.pJOrSKD37RdeYBi', 'ADMIN'),
(7, 'mari', 'maria', 'maria@gmail.com', '04121234567', 'Valera', '$2b$10$onrflAaNrSGB1vuLkeSOBOS9JtHXG.l3aMTj9.pJOrSKD37RdeYBi', 'BASICO'),
(11, 'marivi', 'maria', 'marivi@gmail.com', '04121234567', 'Valera', '$2b$10$cRWQb9MrIAfCiufr3V46yePU027bXKQsVhH5i1Vuqgpu6aaP7sT5S', 'BASICO'),
(12, 'leo', 'Leonardo', 'leo@gmail.com', '04121234567', 'Caracas', '$2b$10$NGp8VdpWvuS4y3rOSXc.Q.D4ItdunyiQZwvxpJmHmjUPlvbaBIQQq', 'BASICO');

-- --------------------------------------------------------

--
-- Table structure for table `usuario_categoria`
--

CREATE TABLE `usuario_categoria` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `usuario_categoria`
--

INSERT INTO `usuario_categoria` (`id`, `usuario_id`, `categoria_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 4, 3),
(6, 5, 1),
(7, 5, 2),
(8, 1, 1),
(9, 2, 1),
(10, 3, 1),
(11, 4, 1),
(12, 4, 2),
(13, 5, 1),
(14, 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `usuario_habito`
--

CREATE TABLE `usuario_habito` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `habito_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `usuario_habito`
--

INSERT INTO `usuario_habito` (`id`, `usuario_id`, `habito_id`) VALUES
(1, 1, 1),
(2, 2, 3),
(3, 3, 2),
(4, 4, 2),
(5, 5, 4),
(6, 6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `usuario_proyecto`
--

CREATE TABLE `usuario_proyecto` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `proyecto_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `usuario_proyecto`
--

INSERT INTO `usuario_proyecto` (`id`, `usuario_id`, `proyecto_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 1),
(5, 2, 2),
(6, 2, 3),
(7, 3, 1),
(8, 3, 2),
(9, 3, 3),
(10, 5, 3),
(11, 1, 1),
(12, 1, 2),
(13, 1, 3),
(14, 2, 1),
(15, 2, 2),
(16, 2, 3),
(17, 3, 1),
(18, 3, 2),
(19, 3, 3),
(20, 5, 3),
(21, 6, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indexes for table `habitos`
--
ALTER TABLE `habitos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `actividad_id` (`actividad_id`);

--
-- Indexes for table `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indexes for table `proyecto_actividad`
--
ALTER TABLE `proyecto_actividad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proyecto_id` (`proyecto_id`),
  ADD KEY `actividad_id` (`actividad_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `usuario_categoria`
--
ALTER TABLE `usuario_categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario_habito`
--
ALTER TABLE `usuario_habito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `habito_id` (`habito_id`);

--
-- Indexes for table `usuario_proyecto`
--
ALTER TABLE `usuario_proyecto`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `habitos`
--
ALTER TABLE `habitos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `proyecto_actividad`
--
ALTER TABLE `proyecto_actividad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `usuario_categoria`
--
ALTER TABLE `usuario_categoria`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `usuario_habito`
--
ALTER TABLE `usuario_habito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `usuario_proyecto`
--
ALTER TABLE `usuario_proyecto`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `actividades_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `habitos`
--
ALTER TABLE `habitos`
  ADD CONSTRAINT `habitos_ibfk_1` FOREIGN KEY (`actividad_id`) REFERENCES `actividades` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `proyecto_actividad`
--
ALTER TABLE `proyecto_actividad`
  ADD CONSTRAINT `proyecto_actividad_ibfk_1` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `proyecto_actividad_ibfk_2` FOREIGN KEY (`actividad_id`) REFERENCES `actividades` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `usuario_habito`
--
ALTER TABLE `usuario_habito`
  ADD CONSTRAINT `usuario_habito_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuario_habito_ibfk_2` FOREIGN KEY (`habito_id`) REFERENCES `habitos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
