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
    
    public function selectSaleResult() {
        $db = new Db;
        $sql = "select 
                    sp.id as id,
                    sp.sale_id as sale_id,
                    sp.product_id as product_id,
                    sp.quantity as quantity,

                    p.name as product_name,
                    p.value as product_value,

                    p.value * sp.quantity as total_value,

                    (select 
                        sum(tpt.value)
                    from tax_product_type tpt
                    where
                        tpt.product_type_id = p.product_type_id
                    ) * (p.value * sp.quantity) / 100 as total_tax_value

                from " . self::$table_name . " sp
                join sale s on s.id = sp.sale_id
                join product p on p.id = sp.product_id
                where
                    sp.sale_id = $1
                order by sp.id asc ";
        $params = [$this->getSaleId()];
        return $db->select($sql, $params);
    }

    public function findById(){
        $db = new Db;
        $sql = "select * 
                from " . self::$table_name . "
                where id = $1";
        $params = [$this->getId()];
        return $db->select($sql, $params);

    }
    
    public function findBySaleId(){
        $db = new Db;
        $sql = "select * 
                from " . self::$table_name . "
                where sale_id = $1
                order by id ";
        $params = [$this->getSaleId()];
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