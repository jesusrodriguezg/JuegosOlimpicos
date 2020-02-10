<?php
    require_once 'conexion.php';

        $conn = new Conexion(); 
        $alt= $_POST["alt"];
        $sql = "SELECT CONTENIDO FROM SLIDE WHERE ALT=\"".$alt."\"";
        $result = $conn->prepare($sql); 
        $result->execute();
        $imagen = $result->fetchObject();
        echo $imagen;        
?>