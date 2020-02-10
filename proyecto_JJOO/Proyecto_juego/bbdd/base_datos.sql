create database JJOO DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
use JJOO;

create table JJOO.eventos_pregunta(
        ID INT(3) PRIMARY KEY,
        PREGUNTA VARCHAR(200),
        RESPUESTAS VARCHAR(200),
        RESPUESTA_ACERTADA VARCHAR(100)
)ENGINE = INNODB;

create table JJOO.puntuaciones(
        ID INT(3) AUTO_INCREMENT PRIMARY KEY,
        NOMBRE_USUARIO VARCHAR(50),
        PUNTUACION VARCHAR(50)
)ENGINE = INNODB;

create table JJOO.eventos_imagen(
        ID INT(3) PRIMARY KEY,
        PREGUNTA VARCHAR(200),
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

--Inserts de imágenes

INSERT INTO JJOO.slide (ID,CONTENIDO,ALT) VALUES(2,'<img id="2" class="d-block w-100" src="imagenes/ciudad1.jpg" alt="slide2">','slide2');
INSERT INTO JJOO.slide (ID,CONTENIDO,ALT) VALUES(3,'<img id="3" class="d-block w-100" src="imagenes/parque1.jpg" alt="slide3">','slide3');

--Inserts de botones

INSERT INTO JJOO.botones(ID,CONTENIDO,ALT) VALUES(1,'<li id="slide2" class="list-group-item boton2" alt="slide2">Akihabara</li>','slide2');
INSERT INTO JJOO.botones(ID,CONTENIDO,ALT) VALUES(1,'<li alt="slide3" class="list-group-item boton2">Parque sin nombre</li>','slide3');
INSERT INTO JJOO.botones(ID,CONTENIDO,ALT) VALUES(2,'<li id="slide4" class="list-group-item boton2" alt="slide2">Shibuya</li>','slide4');
INSERT INTO JJOO.botones(ID,CONTENIDO,ALT) VALUES(3,'<li alt="slide5" class="list-group-item boton2">Castillo Himeji</li>','slide5');

create user usuario_juegos identified by 'Aabc123.';
GRANT ALL PRIVILEGES ON JJOO.* TO usuario_juegos;
