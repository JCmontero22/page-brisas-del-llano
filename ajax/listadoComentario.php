<?php 

    require_once '../config/conexion.php';

    $db = new conexion();
    /* $query = "SELECT * FROM comentarios ORDER BY fecha_comentario DESC LIMIT 10"; */
    $query = "SELECT * FROM comentarios ORDER BY fecha_comentario DESC LIMIT 10";
    $comentarios = $db->select($query);
    
    echo json_encode($comentarios);