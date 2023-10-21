<?php

namespace api\config;

use api\config\Connection;

require_once(__DIR__ . '/./connection.php');

class Db{

    public function __construct() {
    }

    function select($sql, $params = array()) {
        $rows = array();
    
        if($sql){
            $connection = new Connection();
            $connection = $connection->open_connection(); 
        
            $result = pg_query_params($connection, $sql, $params) or throw new \Exception ("Erro ao executar a consulta. Erro: " . pg_last_error());
        
            while($row = pg_fetch_assoc($result)) {
                $rows[] = $row;
            }

            pg_close($connection);
        }
    
        return $rows;
    }
    function insert($sql, $params = array()){

        $connection = new Connection();
        $connection = $connection->open_connection();
    
        pg_prepare($connection, "", $sql);
        $result = pg_execute($connection, '', $params) or throw new \Exception ("Erro ao executar a inserção. Erro: " . pg_last_error());
    
        // $id = pg_last_oid($result);
        // pg_close($connection);

        $id = 0;

        if ($result) {
            $id = pg_fetch_result(pg_query($connection, 'SELECT lastval()'), 0);
        }
        
        pg_close($connection);
    
        return $id;
    }
    
    function update($sql, $params = array()) {
        $connection = new Connection();
        $connection = $connection->open_connection();

        pg_prepare($connection, "", $sql);
        $result = pg_execute($connection, '', $params) or throw new \Exception("Erro ao executar a atualização. Erro: " . pg_last_error());
        
        $rows_updated = pg_affected_rows($result);
        pg_close($connection);

        return $rows_updated;
    }

    function delete($sql, $params = array()) {
        $connection = new Connection();
        $connection = $connection->open_connection();
    
        pg_prepare($connection, "", $sql);
        $result = pg_execute($connection, '', $params) or throw new \Exception ("Erro ao executar a exclusão. Erro: " . pg_last_error());
        
        $rows_deleted = pg_affected_rows($result);
        pg_close($connection);
    
        return $rows_deleted;
    }
    

}


