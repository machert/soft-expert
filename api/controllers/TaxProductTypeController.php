<?php

namespace api\controllers;

use api\models\TaxProductType; 
require_once(__DIR__ . '/../models/TaxProductType.php');


class TaxProductTypeController {

    public function __construct() {
    }
    
    public function index(){
        $taxProductType = new TaxProductType();
        return $taxProductType->selectAll();
    }

    public function show($request){
        $taxProductType = new TaxProductType();

        $taxProductType->setId($request['id'] ?? 0);

        if(!$taxProductType->validateAttributes(['id' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        return $taxProductType->findById();
    }

    public function store($request){
        $taxProductType = new TaxProductType();
        
        $taxProductType->setTaxId($request['tax_id'] ?? 0);
        $taxProductType->setProductTypeId($request['product_type_id'] ?? 0);
        $taxProductType->setValue($request['value'] ?? 0);
        
        if(!$taxProductType->validateAttributes(['tax_id' => true, 'product_type_id' => true, 'value' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $taxProductType->insert();
        if($result){
            return ['status' => 201, 'result' => $result];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }

    public function put($request){
        $taxProductType = new TaxProductType();

        $taxProductType->setId($request['id'] ?? 0);
        $taxProductType->setProductTypeId($request['product_type_id'] ?? 0);
        $taxProductType->setValue($request['value'] ?? 0);

        if(!$taxProductType->validateAttributes(['id' => true, 'product_type_id' => true, 'value' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $taxProductType->update();
        if($result){
            return ['status' => 200, 'result' => $result];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }

    public function delete($request){
        $taxProductType = new TaxProductType();

        $taxProductType->setId($request['id'] ?? 0);

        if(!$taxProductType->validateAttributes(['id' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $taxProductType->delete();
        if($result){
            return ['status' => 204, 'result' => null];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }
}