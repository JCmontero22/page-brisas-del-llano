<?php 

    require_once '../config/conexion.php';

    $db = new conexion();
    /* $query = "SELECT * FROM comentarios ORDER BY fecha_comentario DESC LIMIT 10"; */
    $query = "SELECT * FROM comentarios_brisas_del_llano ORDER BY fecha_comentario DESC LIMIT 10";
    
    $comentarios = $db->select($query);

    echo json_encode($comentarios);