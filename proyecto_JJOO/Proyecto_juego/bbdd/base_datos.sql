create database JJOO DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
use JJOO;

create table JJOO.eventos_pregunta(
        ID INT(3) PRIMARY KEY,
        PREGUNTA VARCHAR(50),
        RESPUESTAS VARCHAR(300),
        RESPUESTA_ACERTADA VARCHAR(100)
)ENGINE = INNODB;

create table JJOO.puntuaciones(
        ID INT(3) AUTO_INCREMENT PRIMARY KEY,
        NOMBRE_USUARIO VARCHAR(50),
        PUNTUACION VARCHAR(50)
)ENGINE = INNODB;

create table JJOO.eventos_imagen(
        ID INT(3) PRIMARY KEY,
        PREGUNTA VARCHAR(50),
        AYUDA VARCHAR(50),
        IMAGEN VARCHAR(100),
        RESPUESTA_ACERTADA VARCHAR(50)
)ENGINE = INNODB;

create table JJOO.eventos_puzzle(
        ID INT(3) PRIMARY KEY,
        PUZZLE VARCHAR(100)
)ENGINE = INNODB;

create table JJOO.botones(
        ID INT(3) PRIMARY KEY,
        CONTENIDO VARCHAR(150),
	ALT VARCHAR(8)
)ENGINE = INNODB;

create table JJOO.slide(
        ID INT(3) PRIMARY KEY,
        CONTENIDO VARCHAR(150),
	ALT VARCHAR(8)
)ENGINE = INNODB;


create user usuario_juegos identified by 'Aabc123.';
GRANT ALL PRIVILEGES ON JJOO.* TO usuario_juegos;
