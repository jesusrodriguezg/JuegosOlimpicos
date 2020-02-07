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
    function muestra ($numero){
        require_once 'conexion.php';

        $conn = new Conexion(); 
        $numero= $numero;
        $sql = "SELECT * FROM `eventos_pregunta`";
        $result = $conn->prepare($sql); 
        $result->execute();
        $pregunta = [];
        while ($registro = $result->fetchObject()) {
            $pregunta[]=$registro->PREGUNTA;
            $pregunta[]=$registro->RESPUESTAS;
            $pregunta[]=$registro->RESPUESTA_ACERTADA;    
        }
        $conn=null;
        var_dump(json_encode($pregunta));
    }

    muestra(3);

    ?>
</body>
</html>