-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 03-02-2020 a las 14:49:12
-- Versión del servidor: 5.7.29-0ubuntu0.18.04.1
-- Versión de PHP: 7.2.24-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `JJOO`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_pregunta`
--

CREATE TABLE `eventos_pregunta` (
  `ID` int(3) NOT NULL,
  `PREGUNTA` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `RESPUESTAS` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `RESPUESTA_ACERTADA` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `eventos_pregunta`
--

INSERT INTO `eventos_pregunta` (`ID`, `PREGUNTA`, `RESPUESTAS`, `RESPUESTA_ACERTADA`) VALUES
(1, '¿En qué año se celebraron los JJOO en España?', '1992,2008,2000', '1992'),
(2, '¿Cada cuántos años se celebran los JJOO?', '4,3,5', '4'),
(3, '¿Dónde se celebraron los JJOO de 2016?', 'Rio de Janeiro,Londres,Madrid', 'Rio de Janeiro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntuaciones`
--

CREATE TABLE `puntuaciones` (
  `ID` int(3) NOT NULL,
  `NOMBRE_USUARIO` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `PUNTUACION` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos_pregunta`
--
ALTER TABLE `eventos_pregunta`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `puntuaciones`
--
ALTER TABLE `puntuaciones`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `puntuaciones`
--
ALTER TABLE `puntuaciones`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
