<?php

namespace api\controllers;

use api\models\Sale; 
require_once(__DIR__ . '/../models/Sale.php');


class SaleController {

    public function __construct() {
    }
    
    public function index(){
        $sale = new Sale();
        return $sale->selectAll();
    }

    public function show($request){
        try{

            $sale = new Sale();
    
            $sale->setId($request['id'] ?? 0);
    
            if(!$sale->validateAttributes(['id' => true])){
                return ['status' => 400, 'result' => 'Dados inválidos'];
            }
    
            return $sale->findById();
        }catch(\Exception $e){
            throw $e;
        }
    }

    public function store($request){
        $sale = new Sale(); 
        
        $sale->setNameCustomer($request['name_customer'] ?? '');
        
        if(!$sale->validateAttributes(['name_customer' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $sale->insert();
        if($result){
            return ['status' => 201, 'result' => $result];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }

    public function put($request){
        $sale = new Sale();

        //Validar se existe name, id

        $sale->setId($request['id'] ?? 0);
        $sale->setNameCustomer($request['name_customer'] ?? '');

        if(!$sale->validateAttributes(['name_customer' => true, 'id' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }
        $result = $sale->update();
        if($result){
            return ['status' => 200, 'result' => $result];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }

    public function delete($request){
        $sale = new Sale();

        //Validar se existe id

        $sale->setId($request['id'] ?? 0);

        if(!$sale->validateAttributes(['id' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $sale->delete();
        if($result){
            return ['status' => 204, 'result' => null];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }
}