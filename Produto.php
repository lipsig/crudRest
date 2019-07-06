<?php
    class Produto {
        public $id;
        public $nome;
        public $preco;
        public $descricao;
        public $categoria;
        public $imagem;

        function __construct($id, $nome, $preco, $descricao, $categoria,$imagem){
            $this->id = $id;
            $this->nome = $nome;
            $this->preco = $preco;
            $this->descricao = $descricao;
            $this->categoria = $categoria;
            $this->imagem = $imagem;
        }
    }
?>