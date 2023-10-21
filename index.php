<?php

namespace SoftExpert;

use api\controllers\ProductTypeController;
use api\controllers\TaxController;
use api\controllers\TaxProductTypeController;
use api\controllers\ProductController;
use api\controllers\SaleController;
use api\controllers\SaleProductController;


require_once './api/controllers/ProductTypeController.php';
require_once './api/controllers/TaxController.php';
require_once './api/controllers/TaxProductTypeController.php';
require_once './api/controllers/ProductController.php';
require_once './api/controllers/SaleController.php';
require_once './api/controllers/SaleProductController.php';
 

function response($data){
    header('Content-Type: application/json');
    echo json_encode($data);
} 

// function route($routes, $controllerPath, $method, $params) {
//     $route = null;

//     // Busca a rota correspondente ao URL solicitada
//     foreach($routes as $routeUrl => $routeDetails) {
//         if($routeUrl === $controllerPath) {
//             $route = $routeDetails;
//             break;
//         }
//     }

//     // Se a rota não foi encontrada, retorna um erro
//     if(!$route) {
//         response(['status' => '404', 'message' => 'Endpoint não encontrado']);
//         return;
//     }

//     // Instancia o controller e chama o método correspondente
//     $controllerName = "api\\controllers\\" . $route['controller'];
//     $controller = new $controllerName;
//     $response = $controller->{$route['method']}($params);

//     response($response);
// }

$method = $_SERVER['REQUEST_METHOD'];
$url = $_SERVER['REQUEST_URI'];
$path = parse_url($url, PHP_URL_PATH);
$get = $_GET;
// $query_string = $_SERVER['QUERY_STRING'];

$routes = [
    '/product-type/' => [
        'controller' => 'ProductTypeController',
        'method' => 'index',
    ],
    '/product-type/' => [
        'controller' => 'ProductTypeController',
        'method' => 'show',
    ],
    '/product-type/' => [
        'controller' => 'ProductTypeController',
        'method' => 'store',
    ],
    '/product-type/' => [
        'controller' => 'ProductTypeController',
        'method' => 'put',
    ],
    '/product-type/' => [
        'controller' => 'ProductTypeController',
        'method' => 'delete',
    ],

    '/tax/' => [
        'controller' => 'TaxController',
        'method' => 'index',
    ],
    '/tax/' => [
        'controller' => 'TaxController',
        'method' => 'show',
    ],
    '/tax/' => [
        'controller' => 'TaxController',
        'method' => 'store',
    ],
    '/tax/' => [
        'controller' => 'TaxController',
        'method' => 'put',
    ],
    '/tax/' => [
        'controller' => 'TaxController',
        'method' => 'delete',
    ],

    '/tax-product-type/' => [
        'controller' => 'TaxProductTypeController',
        'method' => 'index',
    ],
    '/tax-product-type/' => [
        'controller' => 'TaxProductTypeController',
        'method' => 'show',
    ],
    '/tax-product-type/' => [
        'controller' => 'TaxProductTypeController',
        'method' => 'store',
    ],
    '/tax-product-type/' => [
        'controller' => 'TaxProductTypeController',
        'method' => 'put',
    ],
    '/tax-product-type/' => [
        'controller' => 'TaxProductTypeController',
        'method' => 'delete',
    ],

    '/product/' => [
        'controller' => 'ProductController',
        'method' => 'index',
    ],
    '/product/' => [
        'controller' => 'ProductController',
        'method' => 'show',
    ],
    '/product/' => [
        'controller' => 'ProductController',
        'method' => 'store',
    ],
    '/product/' => [
        'controller' => 'ProductController',
        'method' => 'put',
    ],
    '/product/' => [
        'controller' => 'ProductController',
        'method' => 'delete',
    ],


];

try{
             
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if (isset($data['type'])){
        $type = $data['type'];
        if($type == 'api'){
            $params = $data['params'] ?? [];
            $route = $data['route'] ?? '';
            $method = $data['method'] ?? '';

            if(!empty($route) && !empty($method)){
                $controllerName = "api\\controllers\\" . $route;
                $controller = new $controllerName;
                $response = $controller->{$method}($params);
                response($response);
            }else{
                throw new \Exception ("Dados de cabeçalho inválidos.");
            }
    
    
        }
        
    } 

}
catch (\DivisionByZeroError $e) {
    $response = [
        'status' => 400,
        'message' => "Erro: Divisão por zero. " . $e->getMessage(),
    ];
    response($response);
} catch (\TypeError $e) {
    $response = [
        'status' => 400,
        'message' => "Erro: Tipo inválido. " . $e->getMessage(),
    ];
    response($response);
} catch (\RuntimeException $e) {
    $response = [
        'status' => 400,
        'message' => "Erro de tempo de execução. " . $e->getMessage(),
    ];
    response($response);
} catch (\LogicException $e) {
    $response = [
        'status' => 400,
        'message' => "Erro de lógica. " . $e->getMessage(),
    ];
    response($response);
} catch (\RangeException $e) {
    $response = [
        'status' => 400,
        'message' => "Erro de intervalo. " . $e->getMessage(),
    ];
    response($response);
} catch (\LengthException $e) {
    $response = [
        'status' => 400,
        'message' => "Erro de comprimento. " . $e->getMessage(),
    ];
    response($response);
} catch (\OutOfBoundsException $e) {
    $response = [
        'status' => 400,
        'message' => "Erro de limite. " . $e->getMessage(),
    ];
    response($response);
} catch (\OverflowException $e) {
    $response = [
        'status' => 400,
        'message' => "Erro de overflow. " . $e->getMessage(),
    ];
    response($response);
} catch (\UnderflowException $e) {
    $response = [
        'status' => 400,
        'message' => "Erro de underflow. " . $e->getMessage(),
    ];
    response($response);
} catch (\BadFunctionCallException $e) {
    $response = [
        'status' => 400,
        'message' => "Chamada de função inválida. " . $e->getMessage(),
    ];
    response($response);
} catch (\BadMethodCallException $e) {
    $response = [
        'status' => 400,
        'message' => "Chamada de método inválida. " . $e->getMessage(),
    ];
    response($response);
} catch (\UnexpectedValueException $e) {
    $response = [
        'status' => 400,
        'message' => "Valor inesperado. " . $e->getMessage(),
    ];
    response($response);
} catch (\Exception $e) {
    $response = [
        'status' => 400,
        'message' => "Exceção genérica: " . $e->getMessage(),
    ];
    response($response);
}