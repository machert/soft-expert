<?php

namespace api\models;

use api\config\Db;

require_once(__DIR__ . '/../config/db.php');

class Sale {
    private static $table_name = "sale";
    
    private $id;
    private $name_customer;
    private $created_at; 

    public function __construct() {
    }

    public function selectAll() {
        $db = new Db;
        $sql = "select * 
                from " . self::$table_name . "
                order by id asc ";
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
        $sql = "insert into " . self::$table_name . " (name_customer) values ($1);";
        $params = [
            $this->getNameCustomer(), 
        ];
        return $db->insert($sql, $params);
    }

    public function update(){
        $db = new Db;
        $sql = "update  " . self::$table_name . " 
                set 
                    name_customer = $1
                where id = $2;";
        $params = [
            $this->getNameCustomer(),
            $this->getId()
        ];
        return $db->update($sql, $params);
    }

    public function delete(){
        $db = new Db;
        $sql = "delete from " . self::$table_name . " where id = $1;";
        $params = [$this->getId()];
        return $db->delete($sql, $params);
    }

    public function validateAttributes($params){

        if($params['id']){
            if (empty($this->getId()) || !is_numeric($this->getId())) {
                return false;
            }
        }

        if($params['name_customer']){
            if (empty($this->getNameCustomer()) || strlen($this->getNameCustomer()) > 50 || !is_string($this->getNameCustomer())) {
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

    public function getNameCustomer() {
        return $this->name_customer;
    }

    public function setNameCustomer($name_customer) {
        $this->name_customer = $name_customer;
    }

    public function getCreatedAt() {
        return $this->created_at;
    }

    public function setCreatedAt($created_at) {
        $this->created_at = $created_at;
    }

}