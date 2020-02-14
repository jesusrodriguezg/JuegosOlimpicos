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

--Crear tabla de eventos de puzzle
create table 'evento_puzzle'(
    ID INT(3) PRIMARY KEY,
    NOMBRE_PUZZLE VARCHAR(50),
    RUTA_PUZZLE VARCHAR(100)
);

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
