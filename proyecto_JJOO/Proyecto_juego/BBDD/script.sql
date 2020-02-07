--Crear usuario y base de datos

create user usuario-juegos identified by 'usuario';
create database JJOO;
use JJOO;

--Crear tabla de eventos de preguntas
create table 'eventos_pregunta'(
    ID INT(3) PRIMARY KEY,
    PREGUNTA VARCHAR(50),
    RESPUESTAS VARCHAR(300),
    RESPUESTA_ACERTADA VARCHAR(100)
);
--
-- Volcado de datos para la tabla `eventos_pregunta`
--

INSERT INTO `eventos_pregunta` (`ID`, `PREGUNTA`, `RESPUESTAS`, `RESPUESTA_ACERTADA`) VALUES
(1, '¿En qué año se celebraron los JJOO en España?', '1992,2008,2000', '1992'),
(2, '¿Cada cuántos años se celebran los JJOO?', '4,3,5', '4'),
(3, '¿Dónde se celebraron los JJOO de 2016?', 'Rio de Janeiro,Londres,Madrid', 'Rio de Janeiro');

-- --------------------------------------------------------

--Crear tabla de eventos de puzzle
create table 'evento_puzzle'(
    ID INT(3) PRIMARY KEY,
    RUTA_PUZZLE VARCHAR(100)
);

-- Volcado de datos
INSERT INTO evento_puzzle(ID, RUTA_PUZZLE)
VALUES(1, '../puzzles/p1/p1.js');

INSERT INTO evento_puzzle(ID, RUTA_PUZZLE)
VALUES(2, '../puzzles/p2/p2.js');

INSERT INTO evento_puzzle(ID, RUTA_PUZZLE)
VALUES(3, '../puzzles/p3/p3.js');

INSERT INTO evento_puzzle(ID, RUTA_PUZZLE)
VALUES(4, '../puzzles/p4/p4.js');

INSERT INTO evento_puzzle(ID, RUTA_PUZZLE)
VALUES(5, '../puzzles/p5/p5.js');
-----------------------------------------------------------------


--Crear tabla de eventos de imagen
create table 'evento_imagen'(
    ID INT(3) PRIMARY KEY,
    NOMBRE_PUZZLE VARCHAR(50),
    RUTA_PUZZLE VARCHAR(100)
);

--Crear tabla de puntuaciones
create table 'puntuaciones'(
    ID INT(3) AUTO_INCREMENT PRIMARY KEY,
    NOMBRE_USUARIO VARCHAR(50),
    PUNTUACION VARCHAR(50)
);

--Crear tabla de descripciones de lugares
create table 'descripciones'(
	ID_IMG INT(3),
	DESCRIPCION VARCHAR (200);
);

--Asignación de privilegios al usuario de la BD
GRANT ALL PRIVILEGES ON JJOO.* TO usuarios-juegos;
