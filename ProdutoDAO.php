<?php
    include_once 'Produto.php';
	include_once 'PDOFactory.php';

    class ProdutoDAO
    {
        public function inserir(Produto $produto)
        {
            $qInserir = "INSERT INTO produto(nome,preco,descricao,categoria,imagem) VALUES (:nome,:preco,:descricao,:categoria,:imagem)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInserir);
            $comando->bindParam(":nome",$produto->nome);
            $comando->bindParam(":preco",$produto->preco);
            $comando->bindParam(":descricao",$produto->descricao);
            $comando->bindParam(":categoria",$produto->categoria);
            $comando->bindParam(":imagem",$produto->imagem);
            $comando->execute();
            $produto->id = $pdo->lastInsertId();
            return $produto;
        }

        public function deletar($id)
        {
            $qDeletar = "DELETE from produto WHERE id=:id";            
            $produto = $this->buscarPorId($id);
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDeletar);
            $comando->bindParam(":id",$id);
            $comando->execute();
            return $produto;
        }

        public function atualizar(Produto $produto)
        {
            $qAtualizar = "UPDATE produto SET nome=:nome, preco=:preco, descricao=:descricao, categoria=:categoria, imagem=:imagem WHERE id=:id";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qAtualizar);
            $comando->bindParam(":nome",$produto->nome);
            $comando->bindParam(":preco",$produto->preco);
            $comando->bindParam(":descricao",$produto->descricao);
            $comando->bindParam(":categoria",$produto->categoria);
            $comando->bindParam(":imagem",$produto->imagem);
            $comando->bindParam(":id",$produto->id);
            $comando->execute();
            return $produto;        
        }


        public function listar()
        {
		    $query = 'SELECT * FROM produto';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $produtos=array();	
		    while($result = $comando->fetch(PDO::FETCH_OBJ)){
			    $produtos[] = new Produto($result->id,$result->nome,$result->preco,$result->descricao,$result->categoria,$result->imagem);   
            }
            return $produtos;
        }

        public function buscaPromocao()
        {
		    $query = 'SELECT * FROM produto where preco<=20';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $produtos=array();	
		    while($result = $comando->fetch(PDO::FETCH_OBJ)){
			    $produtos[] = new Produto($result->id,$result->nome,$result->preco,$result->descricao,$result->categoria,$result->imagem);   
            }
            return $produtos;
        }

        public function buscarPorId($id)
        {
 		    $query = 'SELECT * FROM produto WHERE id=:id';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('id', $id);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new Produto($result->id,$result->nome,$result->preco,$result->descricao,$result->categoria,$result->imagem);           
        }


        public function buscaCategoria($categoria)
        {
 		    $query = "SELECT * FROM produto WHERE categoria=:categoria";		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('categoria', $categoria);
            $comando->execute();
            $produtos=array();	
            while($result = $comando->fetch(PDO::FETCH_OBJ)){
			    $produtos[] = new Produto($result->id,$result->nome,$result->preco,$result->descricao,$result->categoria,$result->imagem);   
            }
            return $produtos;  
        }


        
    }
?>