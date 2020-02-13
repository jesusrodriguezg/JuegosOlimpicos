<?php
    require_once 'conexion.php';




    if(isset($_POST['funcion']) && !empty($_POST['funcion'])) {
        $funcion = $_POST['funcion'];    
        $numero= $_POST["numero"];
        $alt= $_POST["alt"];        
        //En función del parámetro que nos llegue ejecutamos una función u otra
        switch($funcion) {
            case 'funcion1': 
                Pregunta($numero);
                break;
            case 'funcion2': 
                Imagen($numero);                
                break;
            case 'funcion3':
                CambiarPregunta($alt);
                break;
        }
    }

    function CambiarPregunta($alt){
        $conn = new Conexion(); 
        //$alt= $_POST["alt"];
        $sql = "SELECT * FROM slide WHERE ALT=\"".$alt."\"";
        $result = $conn->prepare($sql);
        $result->execute();
        while ($registro = $result->fetchObject()) {
            $imagen = $registro->CONTENIDO;
        }
        echo $imagen;      
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


    function puntuaciones($nombre, $puntos){
        $conn = new Conexion(); 
        $sql = "INSERT INTO `puntuaciones` (`NOMBRE_USUARIO`, `PUNTUACION`) VALUES (\"".$nombre."\", \"".$puntos."\")";
        $result = $conn->prepare($sql); 
        $result->execute();
        $sql = "SELECT * FROM `puntuaciones` ORDER BY `PUNTUACION` DESC LIMIT 10";
        $result = $conn->prepare($sql); 
        $result->execute();
        $listado = [];
        while ($registro = $result->fetchObject()) {
            $listado[]=["nombre" => $registro->NOMBRE_USUARIO, 
            "puntos" => $registro->PUNTUACION        
        ];
        }
        $conn=null;
        echo json_encode($listado);
    }


?>
