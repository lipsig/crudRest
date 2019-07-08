<?php

include_once('Produto.php');
include_once('ProdutoDAO.php');


class ProdutoController {
    public function listar($request, $response, $args) {
        $dao= new ProdutoDAO;    
        $produtos =  $dao->listar();
                
        return $response->withJson($produtos);    
    }
    
    public function buscaPromocao($request, $response, $args) {
        $dao= new ProdutoDAO;    
        $produtos =  $dao->buscaPromocao();
                
        return $response->withJson($produtos);    
    }

    public function buscaCategoria($request, $response, $args) {
        $categoria = $args['categoria'];
        
        $dao= new ProdutoDAO;    
        $produto = $dao->buscaCategoria($categoria);
        
        return $response->withJson($produto);
    }
    

    public function buscarPorId($request, $response, $args) {
        $id = $args['id'];
        
        $dao= new ProdutoDAO;    
        $produto = $dao->buscarPorId($id);
        
        return $response->withJson($produto);
    }

    

    public function inserir( $request, $response, $args) {
        $p = $request->getParsedBody();
        $produto = new Produto(0,$p['nome'],$p['preco'],$p['descricao'],$p['categoria'],$p['imagem']);
        $dao = new ProdutoDAO;
        $produto = $dao->inserir($produto);
        return $response->withJson($produto,201);    
    }
    
    public function atualizar($request, $response, $args) {
        $id = $args['id'];
        $p = $request->getParsedBody();
        $produto = new Produto($id, $p['nome'], $p['preco'],$p['descricao'],$p['categoria'],$p['imagem']);
    
        $dao = new ProdutoDAO;
        $produto = $dao->atualizar($produto);
    
        return $response->withJson($produto);    
    }

    public function deletar($request, $response, $args) {
        $id = $args['id'];

        $dao = new ProdutoDAO;
        $produto = $dao->deletar($id);
    
        return $response->withJson($produto);  
    }
}