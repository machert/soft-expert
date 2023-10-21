<?php

namespace api\controllers;

use api\models\Product; 
require_once(__DIR__ . '/../models/Product.php');


class ProductController {

    public function __construct() {
    }
    
    public function index(){
        $product = new Product();
        return $product->selectAll();
    }

    public function show($request){
        try{

            $product = new Product();
    
            $product->setId($request['id'] ?? 0);
    
            if(!$product->validateAttributes(['id' => true])){
                return ['status' => 400, 'result' => 'Dados inválidos'];
            }
    
            return $product->findById();
        }catch(\Exception $e){
            throw $e;
        }
    }

    public function store($request){
        $product = new Product();

        //Validar se existe name
        
        $product->setName($request['name'] ?? '');
        $product->setProductTypeId($request['product_type_id'] ?? 0);
        $product->setValue($request['value'] ?? 0);
        
        if(!$product->validateAttributes(['name' => true, 'product_type_id' => true, 'value' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $product->insert();
        if($result){
            return ['status' => 201, 'result' => $result];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }

    public function put($request){
        $product = new Product();

        $product->setId($request['id'] ?? 0);
        $product->setProductTypeId($request['product_type_id'] ?? 0);
        $product->setName($request['name'] ?? '');
        $product->setValue($request['value'] ?? 0);

        if(!$product->validateAttributes(['id' => true, 'name' => true, 'product_type_id' => true, 'value' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $product->update();
        if($result){
            return ['status' => 200, 'result' => $result];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }

    public function delete($request){
        $product = new Product();

        $product->setId($request['id'] ?? 0);

        if(!$product->validateAttributes(['id' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $product->delete();
        if($result){
            return ['status' => 204, 'result' => null];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }
}