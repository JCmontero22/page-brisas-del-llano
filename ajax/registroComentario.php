<?php 

    require_once('../config/conexion.php');

    $parametros = $_POST;

    if (isset($parametros['nombre']) && !empty($parametros['nombre']) && isset($parametros['comentario']) && !empty($parametros['comentario']) && isset($parametros['puntuacion']) && !empty($parametros['puntuacion'])) {
        $bd = new conexion();

        $query = "INSERT INTO comentarios (nombre_usuario_comentario, comentario_comentario, puntuacion_comentario, fecha_comentario) VALUES (:nombre, :comentario, :puntuacion)";

        $resultado = $bd->execute($query);
        
        
    }