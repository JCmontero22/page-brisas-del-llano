<?php 

    require_once('../config/conexion.php');

    $parametros = $_POST;
    if (isset($parametros['nombre']) && !empty($parametros['nombre']) && isset($parametros['comentario']) && !empty($parametros['comentario']) && isset($parametros['puntuacion']) && !empty($parametros['puntuacion'])) {

        $parametros['nombre'] = htmlspecialchars(trim($parametros['nombre']), ENT_QUOTES, 'UTF-8');
        $parametros['comentario'] = htmlspecialchars(trim($parametros['comentario']), ENT_QUOTES, 'UTF-8');
        $parametros['puntuacion'] = htmlspecialchars(trim($parametros['puntuacion']), ENT_QUOTES, 'UTF-8');
        
        $bd = new conexion();
        $parametros['fecha'] = date('Y-m-d H:i:s');
        /* $query = "INSERT INTO comentarios (nombre_usuario_comentario, comentario_comentario, puntuacion_comentario, fecha_comentario) VALUES ('$parametros[nombre]', '$parametros[comentario]', '$parametros[puntuacion]', '$parametros[fecha]')"; */
        $query = "INSERT INTO comentarios_brisas_del_llano (nombre_usuario_comentario, comentario_comentario, puntuacion_comentario, fecha_comentario) VALUES ('$parametros[nombre]', '$parametros[comentario]', '$parametros[puntuacion]', '$parametros[fecha]')";

        $resultado = $bd->execute($query);

        if ($resultado > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Gracias '.$parametros['nombre'].' por tu comentario.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No se pudo registrar tu comentario intentalo mas tarde.']);
        }
        
        
    }