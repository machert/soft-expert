<?php

namespace api\models;

use api\config\Db;

require_once(__DIR__ . '/../config/db.php');

class ProductType {
    
    private static $table_name = "product_type";

    private $id;
    private $name;

    public function __construct() {
    }

    // função para buscar os produtos do BD
    public function selectAll() {
        $db = new Db;
        $sql = "select * 
                from " . self::$table_name . "
                order by 1";
        return $db->select($sql);
    }
    
    public function findById(){
        $db = new Db;
        $sql = "select * 
                from " . self::$table_name . "
                where id = $1";
        $params = [$this->getId()];
        return $db->select($sql, $params);

    }

    public function insert(){
        $db = new Db;
        $sql = "insert into " . self::$table_name . " (name) values ($1);";
        $params = [$this->getName()];
        return $db->insert($sql, $params);
    }

    public function update(){
        $db = new Db;
        $sql = "update  " . self::$table_name . " set name = $1 where id = $2;";
        $params = [$this->getName(), $this->getId()];
        return $db->update($sql, $params);
    }

    public function delete(){
        $db = new Db;
        $sql = "delete from " . self::$table_name . " where id = $1;";
        $params = [$this->getId()];
        return $db->delete($sql, $params);
    }

    public function validateAttributes($params){

        if($params['name']){
            if (empty($this->getName()) || strlen($this->getName()) > 50 || !is_string($this->getName())) {
                return false;
            }
        }

        if($params['id']){
            if (empty($this->getId()) || !is_numeric($this->getId())) {
                return false;
            }
        }

        return true;
    }


    // getters e setters
    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
}