<?php

namespace api\models;

use api\config\Db;

require_once(__DIR__ . '/../config/db.php');

class TaxProductType {
    
    private static $table_name = "tax_product_type";

    private $id;
    private $tax_id;
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
        $sql = "insert into " . self::$table_name . " (tax_id, product_type_id, value) values ($1, $2, $3);";
        $params = [
            $this->getTaxId(), 
            $this->getProductTypeId(),
            $this->getValue()
        ];
        return $db->insert($sql, $params);
    }

    public function update(){
        $db = new Db;
        $sql = "update " . self::$table_name . " 
                set 
                    product_type_id = $1,
                    value = $2
                where id = $3;";

        $params = [
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
        if($params['tax_id']){
            if (empty($this->getTaxId()) || !is_numeric($this->getTaxId())) {
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

    public function getTaxId() {
        return $this->tax_id;
    }

    public function setTaxId($tax_id) {
        $this->tax_id = $tax_id;
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