-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-02-2020 a las 19:05:24
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jjoo`
--
CREATE DATABASE IF NOT EXISTS `jjoo` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `jjoo`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_imagen`
--

DROP TABLE IF EXISTS `eventos_imagen`;
CREATE TABLE IF NOT EXISTS `eventos_imagen` (
  `ID` int(3) NOT NULL,
  `PREGUNTA` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `AYUDA` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `IMAGEN` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `RESPUESTA_ACERTADA` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `eventos_imagen`
--

INSERT INTO `eventos_imagen` (`ID`, `PREGUNTA`, `AYUDA`, `IMAGEN`, `RESPUESTA_ACERTADA`) VALUES
(1, '¿Quien es este tenista?', '**** *****', 'evento_imagen-2.jpg', 'Rafa Nadal'),
(2, '¿Quien es este nadador?', '******* Phelps', 'evento_imagen-4.jpg', 'Michael'),
(3, '¿Cual es esta disciplina olimpica?', '*******', 'evento_imagen-3.jpeg', 'Curling'),
(4, '¿Cual es el nombre de embajador de los JJOO 2020?', '****', 'evento_imagen-1.jpg', 'Goku'),
(5, '¿A qué país representa esta bandera?', 'Au******a', 'evento_imagen-5.jpg', 'Australia'),
(6, '¿A qué país representa esta bandera?', 'Ir****a', 'evento_imagen-6.jpg', 'Irlanda'),
(7, '¿A qué país representa esta bandera?', 'A*****ina', 'evento_imagen-7.jpg', 'Argentina'),
(8, '¿A qué país representa esta bandera?', 'F******ia', 'evento_imagen-8.jpg', 'Finlandia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_pregunta`
--

DROP TABLE IF EXISTS `eventos_pregunta`;
CREATE TABLE IF NOT EXISTS `eventos_pregunta` (
  `ID` int(3) NOT NULL,
  `PREGUNTA` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `RESPUESTAS` varchar(300) COLLATE utf8_spanish_ci DEFAULT NULL,
  `RESPUESTA_ACERTADA` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `eventos_pregunta`
--

INSERT INTO `eventos_pregunta` (`ID`, `PREGUNTA`, `RESPUESTAS`, `RESPUESTA_ACERTADA`) VALUES
(1, '¿En qué año se celebraron los JJOO en España?', '1992,2008,2000', '1992'),
(2, '¿Cada cuántos años se celebran los JJOO?', '4,3,5', '4'),
(3, '¿Dónde se celebraron los JJOO de 2016?', 'Rio de Janeiro,Londres,Madrid', 'Rio de Janeiro'),
(4, '¿Qué nueva disciplina olímpica se ha introducido este año?', 'Skateboarding,Petanca,Pesca de trucha', 'Skateboarding'),
(5, '¿Quién tiene el record del mundo de 100 metros lisos?', 'Usain Bolt,Carl Lewis,Speedy González', 'Usain Bolt'),
(6, '¿En qué país se crearon los JJOO?', 'Grecia,EEUU,España', 'Grecia'),
(7, '¿Cuál de estos deportes NO es disciplina olímpica?', 'Patinaje,Surf,Karate', 'Patinaje'),
(8, '¿Qué deportista tiene el récord de medallas olímpicas?', 'Usain Bolt,Ian Millar,Michael Phelps', 'Michael Phelps'),
(9, '¿Cuántos países participan en los juegos de Tokyo 2020?', '163 países,218 países,204 países', '204 países'),
(10, 'La televisión es un medio imprescindible para seguir los Juegos Olímpicos ¿En qué año se televisaron por primera vez?', 'Helsinki 1952,Los Ángeles 1920,Berlín 1936', 'Berlín 1936'),
(11, 'Dimitrios Loundras fue el atleta más joven en conseguir una medalla en unos juegos olímpicos ¿Cuántos años tenía?', '9 años,10 años,14 años', '10 años'),
(12, 'La bandera olímpica de los 5 anillos entrelazados representa a los 5 continentes ¿En qué Juegos Olímpicos se estrenó?', 'Atenas 1896,Amberes 1920,Berlín 1936', 'Amberes 1920'),
(13, '¿Donde se celebraran los Juegos Olímpicos desdés de Tokyo?', 'París,Madrid,Berlín', 'París'),
(14, '¿En que año pudieron participar por primera vez las mujeres en unos JJOO?', '1892,1920,1900', '1920');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_puzzle`
--

DROP TABLE IF EXISTS `eventos_puzzle`;
CREATE TABLE IF NOT EXISTS `eventos_puzzle` (
  `ID` int(3) NOT NULL,
  `PUZZLE` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntuaciones`
--

DROP TABLE IF EXISTS `puntuaciones`;
CREATE TABLE IF NOT EXISTS `puntuaciones` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `NOMBRE_USUARIO` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `PUNTUACION` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
--
-- Crear usuario contraseña puesta por mi si teneis otra adaptarlo
--
create user usuario_juegos identified by 'usuario';
GRANT ALL PRIVILEGES ON JJOO.* TO usuario_juegos;
