<?php

namespace api\controllers;

use api\models\Tax; 
require_once(__DIR__ . '/../models/Tax.php');


class TaxController {

    public function __construct() {
    }
    
    public function index(){
        $tax = new Tax();
        return $tax->selectAll();
    }

    public function show($request){
        try{

            $tax = new Tax();
    
            $tax->setId($request['id'] ?? 0);
    
            if(!$tax->validateAttributes(['id' => true])){
                return ['status' => 400, 'result' => 'Dados inválidos'];
            }
    
            return $tax->findById();
        }catch(\Exception $e){
            throw $e;
        }
    }

    public function store($request){
        $tax = new Tax();

        //Validar se existe name
        
        $tax->setName($request['name'] ?? '');
        
        if(!$tax->validateAttributes(['name' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $tax->insert();
        if($result){
            return ['status' => 201, 'result' => $result];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }

    public function put($request){
        $tax = new Tax();

        //Validar se existe name, id

        $tax->setId($request['id'] ?? 0);
        $tax->setName($request['name'] ?? '');

        if(!$tax->validateAttributes(['name' => true, 'id' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $tax->update();
        if($result){
            return ['status' => 200, 'result' => $result];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }

    public function delete($request){
        $tax = new Tax();

        //Validar se existe id

        $tax->setId($request['id'] ?? 0);

        if(!$tax->validateAttributes(['id' => true])){
            return ['status' => 400, 'result' => 'Dados inválidos'];
        }

        $result = $tax->delete();
        if($result){
            return ['status' => 204, 'result' => null];
        }else{
            return ['status' => 400, 'result' => $result];
        } 
    }
}