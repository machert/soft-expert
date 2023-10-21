<?php

namespace api\models;

use api\config\Db;

require_once(__DIR__ . '/../config/db.php');

class Product {
    private static $table_name = "product";
    
    private $id;
    private $name;
    private $product_type_id;
    private $value;

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
        $sql = "insert into " . self::$table_name . " (name, product_type_id, value) values ($1, $2, $3);";
        $params = [
            $this->getName(),
            $this->getProductTypeId(),
            $this->getValue()
        ];
        return $db->insert($sql, $params);
    }

    public function update(){
        $db = new Db;
        $sql = "update  " . self::$table_name . " 
                set 
                    name = $1,
                    product_type_id = $2,
                    value = $3
                where id = $4;";
        $params = [
            $this->getName(),
            $this->getProductTypeId(),
            $this->getValue(),
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

        if($params['name']){
            if (empty($this->getName()) || strlen($this->getName()) > 50 || !is_string($this->getName())) {
                return false;
            }
        }

        if($params['product_type_id']){
            if (empty($this->getProductTypeId()) || !is_numeric($this->getProductTypeId())) {
                return false;
            }
        }

        if($params['value']){
            //uma taxa tem que ter valor
            if (empty($this->getValue()) || !is_numeric($this->getValue()) ) {
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

    public function getProductTypeId() {
        return $this->product_type_id;
    }

    public function setProductTypeId($product_type_id) {
        $this->product_type_id = $product_type_id;
    }

    public function getValue() {
        return $this->value;
    }

    public function setValue($value) {
        $this->value = $value;
    }
}