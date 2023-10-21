<?php

namespace api\models;

use api\config\Db;

require_once(__DIR__ . '/../config/db.php');

class SaleProduct {
    private static $table_name = "sale_product";
    
    private $id;
    private $sale_id;
    private $product_id; 
    private $quantity;

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
        $sql = "insert into " . self::$table_name . " (sale_id, product_id, quantity) values ($1, $2, $3);";
        $params = [
            $this->getSaleId(), 
            $this->getProductId(), 
            $this->getQuantity() 
        ];
        return $db->insert($sql, $params);
    }

    public function update(){
        $db = new Db;
        $sql = "update  " . self::$table_name . " 
                set 
                    quantity = $1,
                    product_id = $2
                where id = $3;";
        $params = [
            $this->getQuantity(),
            $this->getProductId(), 
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

        if($params['sale_id']){
            if (empty($this->getSaleId()) || !is_numeric($this->getSaleId())) {
                return false;
            }
        }

        if($params['product_id']){
            if (empty($this->getProductId()) || !is_numeric($this->getProductId())) {
                return false;
            }
        }

        if($params['quantity']){
            if (empty($this->getQuantity()) || !is_numeric($this->getQuantity())) {
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

    public function getSaleId() {
        return $this->sale_id;
    }

    public function setSaleId($sale_id) {
        $this->sale_id = $sale_id;
    }

    public function getProductId() {
        return $this->product_id;
    }

    public function setProductId($product_id) {
        $this->product_id = $product_id;
    }

    public function getQuantity() {
        return $this->quantity;
    }

    public function setQuantity($quantity) {
        $this->quantity = $quantity;
    }

}