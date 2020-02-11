<?php
    require_once 'conexion.php';




    if(isset($_POST['funcion']) && !empty($_POST['funcion'])) {
        $funcion = $_POST['funcion'];    
        $numero= $_POST["numero"];
        //En función del parámetro que nos llegue ejecutamos una función u otra
        switch($funcion) {
            case 'funcion1': 
                Pregunta($numero);
                break;
            case 'funcion2': 
                Imagen($numero);                
                break;
        }
    }




    function Pregunta($numero){
        $conn = new Conexion(); 
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
    }




    function Imagen($numero){
        $conn = new Conexion(); 
        $sql = "SELECT * FROM `eventos_imagen` WHERE ID=\"".$numero."\"";
        $result = $conn->prepare($sql); 
        $result->execute();
        $imagen = [];
        while ($registro = $result->fetchObject()) {
            $pregunta[]=$registro->PREGUNTA;
            $pregunta[]=$registro->AYUDA;
            $pregunta[]=$registro->IMAGEN;
            $pregunta[]=$registro->RESPUESTA_ACERTADA;    
        }
        $conn=null;
        echo json_encode($pregunta);
    }
?>