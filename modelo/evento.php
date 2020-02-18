<?php

require_once 'conexion.php';

class Evento {   


    public static function obtenerPreguntas($numero){
        $sql = "SELECT * FROM `eventos_pregunta` WHERE `ID`=\"".$numero."\"";
        $result = Evento::Ejecutar($sql);        
        $pregunta = [];
        while ($registro = $result->fetchObject()) {            
            $pregunta[]=$registro->PREGUNTA;
            $pregunta[]=$registro->RESPUESTAS;
            $pregunta[]=$registro->RESPUESTA_ACERTADA; 
        }
        return $pregunta;
    }

    public static function obtenerImagenes($numero){
        $sql = "SELECT * FROM `eventos_imagen` WHERE `ID`=\"".$numero."\"";
        $result = Evento::Ejecutar($sql);
        $imagen = [];
        while ($registro = $result->fetchObject()) {
            $imagen[]=$registro->PREGUNTA;
            $imagen[]=$registro->AYUDA;
            $imagen[]=$registro->IMAGEN;
            $imagen[]=$registro->RESPUESTA_ACERTADA;    
        }
        return $imagen;
    }

    public static function Ejecutar($sql){
        $conn = new Conexion(); 
        $result = $conn->prepare($sql);
        $result->execute();
        $conn=null;
        return $result;
     }
}
?>