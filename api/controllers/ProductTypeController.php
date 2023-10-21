<?php

namespace api\controllers;

use api\models\ProductType; 
require_once(__DIR__ . '/../models/ProductType.php');


class ProductTypeController {

    public function __construct() {
    }
    
    public function index(){
        $productType = new ProductType();
        return $productType->selectAll();
    }

    public function show($request){
        $productType = new ProductType();

        $productType->setId($request['id'] ?? 0);

        if(!$productType->validateAttributes(['id' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        return $productType->findById();
    }

    public function store($request){
        $productType = new ProductType();

        //Validar se existe name
        
        $productType->setName($request['name'] ?? '');
        
        if(!$productType->validateAttributes(['name' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $productType->insert();
        if($result){
            return ['status' => 201, 'result' => $result];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }

    public function put($request){
        $productType = new ProductType();

        //Validar se existe name, id

        $productType->setId($request['id'] ?? 0);
        $productType->setName($request['name'] ?? '');

        if(!$productType->validateAttributes(['name' => true, 'id' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $productType->update();
        if($result){
            return ['status' => 200, 'result' => $result];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }

    public function delete($request){
        $productType = new ProductType();

        //Validar se existe id

        $productType->setId($request['id'] ?? 0);

        if(!$productType->validateAttributes(['id' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $productType->delete();
        if($result){
            return ['status' => 204, 'result' => null];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }
}