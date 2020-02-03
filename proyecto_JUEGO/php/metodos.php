<?php
    require_once 'conexion.php';
        $conn = new Conexion(); 
        $numero= $_POST["numero"];
        $sql = "SELECT * FROM `eventos_pregunta` WHERE ID=\"".$numero."\"";
        $result = $conn->prepare($sql); 
        $result->execute();
        $pregunta = [];
        while ($registro = $result->fetchObject()) {
            $pregunta[]=$registro->PREGUNTA;
            $pregunta[]=$registro->RESPUESTAS;
            $pregunta[]=$registro->RESPUESTA_ACERTADA;    
        }
        $conn=null;
        echo json_encode($pregunta);
?>