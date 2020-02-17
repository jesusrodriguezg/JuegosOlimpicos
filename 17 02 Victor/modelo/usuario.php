<?php

require_once 'conexion.php';

class Usuario {
    
    private $nombre;
    private $puntuacion;

    public function __construct($nombre, $puntuacion){
        $this->nombre = $nombre;
        $this->puntuacion = $puntuacion;
    }
    
    public function Mostrar_nombre(){
        return $this->nombre;
    }
    public function Mostrar_mail(){
        return $this->puntuacion;
    }

    public function insertarPuntuacion(){
        $sql = "INSERT INTO `puntuaciones` (`NOMBRE_USUARIO`, `PUNTUACION`) VALUES (\"".$this->nombre."\", \"".$this->puntuacion."\")";    
        $this->EjecutarEntrada($sql); 
    }

    public static function obtenerPuntuacion(){
        $sql = "SELECT * FROM `puntuaciones` ORDER BY `PUNTUACION` DESC LIMIT 10";
        //echo $sql;
       // $result = $this->Ejecutar($sql);
        $listado = [];  
        $conn = new Conexion(); 
        $result = $conn->prepare($sql);
        $result->execute();
        $conn=null;      
        while ($registro = $result->fetchObject()) {
            $listado[]=["nombre" => $registro->NOMBRE_USUARIO, 
            "puntos" => $registro->PUNTUACION        
            ];
        }
        //echo json_encode($listado);
        //var_dump($listado);
        return $listado;
    }

     function EjecutarEntrada($sql){
        $conn = new Conexion(); 
        $result = $conn->prepare($sql);
        $result->execute();
        $conn=null;
     }

}
?>