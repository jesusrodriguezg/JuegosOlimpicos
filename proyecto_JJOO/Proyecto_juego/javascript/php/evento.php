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
            array_push($pregunta, $registro[0]);
            array_push($pregunta, $registro["RESPUESTAS"]);
            array_push($pregunta, $registro["RESPUESTA_ACERTADA"]);
        }
         $conn=null;
        return $pregunta;
    }

    public function obtenerImagenes($numero){
        $sql = "SELECT * FROM 'eventos_imagen' WHERE 'ID'=\"".$numero."\"";
        $regiresultstro = $this->Ejecutar($sql);
        $imagen = [];
        while ($registro = $result->fetchObject()) {
            $pregunta[]=$registro->PREGUNTA;
            $pregunta[]=$registro->AYUDA;
            $pregunta[]=$registro->IMAGEN;
            $pregunta[]=$registro->RESPUESTA_ACERTADA;    
        }
        return $pregunta;
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