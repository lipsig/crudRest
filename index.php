<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;
use Slim\Http\UploadedFile;

include_once('ProdutoController.php');
include_once('UsuarioController.php');
require './vendor/autoload.php';

$app = new \Slim\App;
	
$app->group('/produtos', function() use ($app) {
    $app->get('','ProdutoController:listar');
    $app->post('','ProdutoController:inserir');
    $app->get('/categoria/{categoria}','ProdutoController:buscaCategoria');
    $app->get('/promocao','ProdutoController:buscaPromocao');
    $app->get('/{id}','ProdutoController:buscarPorId');    
    $app->put('/{id}','ProdutoController:atualizar');
    $app->delete('/{id}', 'ProdutoController:deletar');
})->add('UsuarioController:validarToken');

$app->post('/upload', function(Request $request, Response $response) {
    $directory = "uploads";

    $uploadedFiles = $request->getUploadedFiles();

    // handle single input with single file upload
    $uploadedFile = $uploadedFiles['example1'];
    if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
        $filename = moveUploadedFile($directory, $uploadedFile);
        $response->write($filename);
    }

});


function moveUploadedFile($directory, UploadedFile $uploadedFile)
{
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
    $filename = sprintf('%s.%0.8s', $basename, $extension);

    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

    return $filename;
}


$app->post('/usuarios','UsuarioController:inserir');

$app->post('/auth','UsuarioController:autenticar');

$app->run();
