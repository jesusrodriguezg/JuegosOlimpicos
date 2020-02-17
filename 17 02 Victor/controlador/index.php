<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php
    /*function muestra ($numero){
        require_once 'conexion.php';

        $conn = new Conexion(); 
        $numero= $numero;
        $result = $conn->prepare($sql); 
        $result->execute();
        $sql = "SELECT * FROM `eventos_pregunta`";
        $registro = Conexion::Ejecutar($sql);
        $pregunta = [];
        while ($registro = $result->fetchObject()) {
            $pregunta[]=$registro->PREGUNTA;
            $pregunta[]=$registro->RESPUESTAS;
            $pregunta[]=$registro->RESPUESTA_ACERTADA;    
        }
        $conn=null;
        var_dump(json_encode($pregunta));
    }*/

    
    //include 'usuario.php';
       // $usuario = new Usuario("benganito", "100");
        //var_dump($usuario);
        ///echo $usuario->Mostrar_nombre();
        //$usuario->insertarPuntuacion(); 
       // $result = Usuario::obtenerPuntuacion();
       //var_dump($result);
        
        //var_dump($listado);


        require_once 'evento.php';
        $pregunta = Evento::obtenerImagenes('1');
        var_dump($pregunta);


    ?>
</body>
</html>