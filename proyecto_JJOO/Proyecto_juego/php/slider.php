<?php
    require_once 'conexion.php';

        $conn = new Conexion(); 
        $alt= $_POST["alt"];
        $sql = "SELECT CONTENIDO FROM SLIDE WHERE ALT=\"".$alt."\"";
        $result = $conn->prepare($sql); 
        $result->execute();ç
        $imagen=null;
        while ($registro = $result->fetchObject()){
        	$imagen=$registro->CONTENIDO;
        }
        echo $imagen;        
?>