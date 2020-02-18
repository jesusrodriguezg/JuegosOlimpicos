<?php
    require_once '../modelo/usuario.php';
    require_once '../modelo/evento.php';




    if(isset($_POST['funcion']) && !empty($_POST['funcion'])) {
        $funcion = $_POST['funcion'];               
        //En función del parámetro que nos llegue ejecutamos una función u otra
        switch($funcion) {
            case 'funcion1': 
                Pregunta($_POST["numero"]);
                break;
            case 'funcion2': 
                Imagen($_POST["numero"]);                
                break;
            case 'funcion3':
                CambiarPregunta($_POST["alt"]);
                break; 
            case 'puntuaciones':
                introPuntuaciones($_POST["nombre"], $_POST["puntos"]);
                break; 
            case 'verpuntuaciones':
                verPuntuaciones();
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

    function introPuntuaciones($nombre, $puntos){
        $user = new Usuario($nombre, $puntos);
        $user->insertarPuntuacion();  
        verPuntuaciones();
    }

    function verPuntuaciones(){
          
        $listado = Usuario::obtenerPuntuacion();
        echo json_encode($listado);
    }


?>
