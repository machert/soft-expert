<?php

namespace api\config;

class Connection{

    function open_connection(){
        $host = "localhost";
        $port = "5432";
        $dbname = "soft_expert";
        $user = "postgres";
        $password = "soft123";
        
        // Estabelece uma conexão com o banco de dados
        $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
        
        // Verifica se a conexão foi bem-sucedida
        if (!$conn) {
            die("Falha ao conectar ao banco de dados: " . pg_last_error());
        }
    
        return $conn;
        
    }

}

