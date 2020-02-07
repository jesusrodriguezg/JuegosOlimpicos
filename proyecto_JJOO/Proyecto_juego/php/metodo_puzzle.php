<?php
    require_once 'conexion.php';
    //conexion
    $conn = new Conexion(); 
    //selecciona todos los puzzles
    $sql = "SELECT * FROM `evento_puzzle`";
    $result = $conn->prepare($sql); 
    $result->execute();
    //array con puzzles
    $apuzzles = [];
    while ($registro = $result->fetchObject()) {
        $apuzzles[]=$registro->ID;
        $apuzzles[]=$registro->RUTA_PUZZLE;    
    }
    $conn=null;
    echo json_encode($apuzzles);
?>
