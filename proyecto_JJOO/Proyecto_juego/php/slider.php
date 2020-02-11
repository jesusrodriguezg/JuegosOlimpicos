<?php
    require_once 'conexion.php';

        $conn = new Conexion(); 
        $alt= $_POST["alt"];
        $sql = "select * from slide where ALT=\"".$alt."\"";
        $result = $conn->prepare($sql);
        $result->execute();
        while ($registro = $result->fetchObject()) {
            $imagen = $registro->CONTENIDO;
        }
        echo $imagen;        
?>