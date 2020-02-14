<?php

require_once 'conexion.php';

class Evento {   


    public function obtenerPreguntas($numero){
        $sql = "SELECT * FROM eventos_pregunta WHERE ID=$numero";
        $pregunta = array();
        $conn = new Conexion(); 
        $result = $conn->prepare($sql);
        $result->execute();
       
        while ($registro = $result->fetch(PDO::FETCH_ASSOC)){        
            array_push($pregunta, $registro["PREGUNTA"]);
            array_push($pregunta, $registro["RESPUESTAS"]);
            array_push($pregunta, $registro["RESPUESTA_ACERTADA"]);
        }
         $conn=null;
        return $pregunta;
    }

    public function obtenerImagenes($numero){
        $sql = "SELECT * FROM eventos_imagen WHERE ID= $numero";
        $conn = new Conexion(); 
        $result = $conn->prepare($sql);
        $result->execute();
        $imagen = [];
        while ($registro = $result->fetch(PDO::FETCH_ASSOC)) {
            array_push($imagen, $registro["PREGUNTA"]);
            array_push($imagen, $registro["AYUDA"]);
            array_push($imagen, $registro["IMAGEN"]);
            array_push($imagen, $registro["RESPUESTA_ACERTADA"]);
        }
        return $imagen;
    }

    function Ejecutar($sql){
        echo "hola";
        $conn = new Conexion(); 
        $result = $conn->prepare($sql);
        $result->execute();
        $conn=null;
        return $result;
     }
}
?>