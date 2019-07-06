<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>FERRAGEM</title>
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.css">
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" charset="utf-8"></script>
</head>
<body>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <a class="navbar-brand" href="index.php"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item"><a class="btn btn-outline-info" href="http://localhost/faculterca/front">VOLTAR&nbsp;<i
                class="fa fa-sign-out-alt"></i></a></li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div style="background-color:#17a2b8; color:white; padding:15px; font-size:30px;" class="card-header">Criar
            Registro de Produto</div>
          <div class="card-body">
            <form id="cadastraForm" action="front.php" method="post" enctype="multipart/form-data">
              <div class="form-group">
                <label for="name">Nome do Produto</label>
                <input type="text" maxlength="30" id="nome" class="form-control" name="nome"
                  placeholder="Nome, Ex: Lâmpada Fluorescente..." value="">
              </div>

              <div class="form-group">
                <label for="categoria">Categoria</label>

                <select class="form-control" id="categoria" name="categoria">

                  <option selected>Lampada</option>
                  <option>Martelo</option>
                  <option>Tinta</option>
                  <option>Furadeira</option>
                </select>
              </div>
              <div class="form-group">
                <label for="contact">Preço</label>
                <input type="number" id="preco" class="form-control col-md-4" name="preco" placeholder="Valor em reais"
                  value="">
              </div>
              <div class="form-group">
                <label for="descricao">Descrição</label>
                <textarea class="form-control" id="descricao" name="descricao"
                  placeholder="Fale um pouco sobre o produto..." rows="3"></textarea>
              </div>
              <div class="form-group">
                <label for="image">Selecione uma imagem para o produto...</label>
                <input type="file" id="file" name="file" class="form-control" />
              </div>
              <div class="form-group">
                <button type="submit" name="Submit" class="btn btn-dark waves">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
     $(function(){
        var caminho="";
        var that=this;
        $("#cadastraForm").on("submit", function(event) {
          var form_data = new FormData();           
          form_data.append('example1', $('#file').prop('files')[0]);                  
          $.ajax({
              url: 'http://localhost/faculterca/upload',
              dataType: 'text', 
              cache: false,
              contentType: false,
              processData: false,
              data: form_data, 
              async:false,
              type: 'post',
              success: function(data){
                  console.log(data); 
                  that.caminho=data;
              }
          });
            event.preventDefault();
            var formData = {
                'nome': $('#nome').val(),
                'preco': $('#preco').val(),
                'descricao': $('#descricao').val(),
                'categoria': $('#categoria').val(),
                'imagem' : that.caminho,
            };
            console.log(formData);
            $.ajax({
                url: "http://localhost/faculterca/produtos",
                async:false, 
                type: "post",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(formData),
                headers: {
                 'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'         
               },
                success: function() {
                alert("Produto Cadastrado");
                },
                error: function(){
                  alert("erro ao cadastrar produto, verifique todos os campos foram preenchidos");
                }
            });      
    })  
     });
      </script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" charset="utf-8"></script>
  </body>
</html>
