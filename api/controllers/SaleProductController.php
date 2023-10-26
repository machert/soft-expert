<?php

namespace api\controllers;

use api\models\SaleProduct; 
require_once(__DIR__ . '/../models/SaleProduct.php');


class SaleProductController {

    public function __construct() {
    }
    
    public function index(){
        $saleProduct = new SaleProduct();
        return $saleProduct->selectAll();
    }

    public function show($request){
        try{

            $saleProduct = new SaleProduct();
    
            $saleProduct->setId($request['id'] ?? 0);
    
            if(!$saleProduct->validateAttributes(['id' => true])){
                return ['status' => 400, 'result' => 'Dados inválidos'];
            }
    
            return $saleProduct->findById();
        }catch(\Exception $e){
            throw $e;
        }
    }

    

    public function selectSaleResult($request){
        try{

            $saleProduct = new SaleProduct();
    
            $saleProduct->setSaleId($request['sale_id'] ?? 0);
    
            if(!$saleProduct->validateAttributes(['sale_id' => true])){
                return ['status' => 400, 'result' => 'Dados inválidos'];
            }
    
            return $saleProduct->selectSaleResult();
        }catch(\Exception $e){
            throw $e;
        }
    }
    
    public function findBySaleId($request){
        $saleProduct = new SaleProduct();
    
        $saleProduct->setSaleId($request['sale_id'] ?? 0);

        if(!$saleProduct->validateAttributes(['sale_id' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        return $saleProduct->findBySaleId();
    }

    public function store($request){
        $saleProduct = new SaleProduct(); 
        
        
        $saleProduct->setSaleId($request['sale_id'] ?? 0);
        $saleProduct->setProductId($request['product_id'] ?? 0);
        $saleProduct->setQuantity($request['quantity'] ?? 0);

        if(!$saleProduct->validateAttributes(['sale_id' => true], ['product_id' => true] , ['quantity' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $saleProduct->insert();
        if($result){
            return ['status' => 201, 'result' => $result];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }

    public function put($request){
        $saleProduct = new SaleProduct();
 

        $saleProduct->setId($request['id'] ?? 0);
        $saleProduct->setProductId($request['product_id'] ?? 0);
        $saleProduct->setQuantity($request['quantity'] ?? 0);

        if(!$saleProduct->validateAttributes(['id' => true], ['product_id' => true] , ['quantity' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }
        $result = $saleProduct->update();
        if($result){
            return ['status' => 200, 'result' => $result];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }

    public function delete($request){
        $saleProduct = new SaleProduct();
 

        $saleProduct->setId($request['id'] ?? 0);

        if(!$saleProduct->validateAttributes(['id' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $saleProduct->delete();
        if($result){
            return ['status' => 204, 'result' => null];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }
}