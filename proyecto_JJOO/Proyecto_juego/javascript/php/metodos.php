<?php
    require_once 'usuario.php';
    require_once 'evento.php';




    if(isset($_POST['funcion']) && !empty($_POST['funcion'])) {
        $funcion = $_POST['funcion'];    
        $numero= $_POST["numero"];
        //$alt= $_POST["alt"];        
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
            case 'puntuaciones':
                puntuaciones($_POST["nombre"], $_POST["puntos"]);
                break; 
        }
    }


    function Pregunta($numero){
        $pregunta = Evento::obtenerPreguntas($numero);
        echo json_encode($pregunta);      
    }


    function CambiarPregunta($alt){
        //$conn = new Conexion(); 
        //$alt= $_POST["alt"];
        $sql = "SELECT * FROM slide WHERE ALT=\"".$alt."\"";
        //$result = $conn->prepare($sql);
        //$result->execute();
        $registro = Conexion::Ejecutar($sql);
        while ($registro = $result->fetchObject()) {
            $imagen = $registro->CONTENIDO;
        }
        echo $imagen;      
    }




    function Imagen($numero){        
        $pregunta = Evento::obtenerImagenes($numero);
        echo json_encode($pregunta);
    }

    function puntuaciones($nombre, $puntos){
        $user = new Usuario($nombre, $puntos);
        $user->insertarPuntuacion();  
        $listado = Usuario::obtenerPuntuacion();
        echo json_encode($listado);
    }


?>