
//mostrar produtos
$.ajax({
    url: 'http://localhost/faculterca/produtos',
    type: 'GET',
    dataType: 'json',
    headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'
    },
    dataType: 'text',

    success: function (result) {
        produtos = JSON.parse(result);

        $.each(produtos, function (i) {

            $(".aqui").append('<tr style="background-color:white; color:red; text-align:center;">');
            $(".aqui").append('<td style="font-size:25px; font-weight:bold;">' + produtos[i].id + '</td>');
            $(".aqui").append('<td style="font-size:20px;">' + produtos[i].nome + '</td>');
            $(".aqui").append('<td style="font-size:20px;">' + produtos[i].categoria + '</td>');
            $(".aqui").append('<td style="font-size:20px;">R$' + produtos[i].preco + '</td>');
            $(".aqui").append('<td style="font-size:18px;">' + produtos[i].descricao + '</td>');
            $(".aqui").append('<td style="font-size:18px;"><img class="imagem" style="padding-left:50px; height:200px;" src="uploads/' + produtos[i].imagem + '"></td>');
            $(".aqui").append('<td><br><button style="color:white;" data-toggle="modal" data-target="#modalExemplo" class="edita offset-sm-1 btn btn-info">Editar</button><br><br><a style="color:white; padding:5px;" class="remove offset-sm-1 btn btn-danger">Remover</a></td>');
            $(".aqui").append('</tr>');

            //remove
            $(".remove").eq(i).click(function () {
                valor = produtos[i].id;

                $.ajax({
                    url: 'http://localhost/faculterca/produtos/' + valor,
                    type: 'DELETE',
                    dataType: 'text',
                    headers: {
                        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'
                    },
                    success: function (result) {
                        alert("Produto deletado");
                        window.location = 'http://localhost/faculterca/front';
                    }
                });
            });


            var caminho = "";
            var that = this;
            var valor = 0;
            //editar 
            $(".edita").eq(i).click(function () {
                console.log(produtos[i].id);
                that.valor = produtos[i].id;
                $('#nomeModal').val(produtos[i].nome);
                $('#descricaoModal').val(produtos[i].descricao);
                $('#precoModal').val(produtos[i].preco);
                $('#cateogiraModal').val(produtos[i].categoria);
                $('#imagemModal').attr("src", 'uploads/' + produtos[i].imagem);



                $("#formModal").on("submit", function (event) {
                    var form_data = new FormData();
                    form_data.append('example1', $('#file').prop('files')[0]);
                    $.ajax({
                        url: 'http://localhost/faculterca/upload',
                        dataType: 'text',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form_data,
                        async: false,
                        type: 'post',
                        success: function (data) {
                            console.log(data);
                            that.caminho = data;
                        }
                    });
                    event.preventDefault();
                    var formData = {
                        'id': valor,
                        'nome': $('#nomeModal').val(),
                        'preco': $('#precoModal').val(),
                        'descricao': $('#descricaoModal').val(),
                        'categoria': $('#categoriaModal').val(),
                        'imagem': that.caminho,
                    };
                    console.log(formData);
                    $.ajax({
                        url: "http://localhost/faculterca/produtos/" + produtos[i].id,
                        async: false,
                        type: "put",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(formData),
                        headers: {
                            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'
                        },
                        success: function () {
                            alert("Produto Cadastrado");
                        },
                        error: function () {
                            alert("erro ao cadastrar produto, verifique todos os campos foram preenchidos");
                        }
                    });
                });
            });
        });
    },
    error: function (error) {
        console.log(error);
    }
});


//buscarporid
$("#pesquisa").click(function () {
    if ($('#digiteID').val() == "" || $('#digiteID').val() == undefined || $('#digiteID').val() == 0) {
        alert("é necessario dizer o id do produto")
    }
    valor = $('#digiteID').val();
    $.ajax({
        url: 'http://localhost/faculterca/produtos/' + valor,
        type: 'GET',
        dataType: 'text',
        headers: {
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'
        },
        success: function (result) {
            produtos = JSON.parse(result);
            $("td").remove();
            $(".aqui").append('<tr style="background-color:white; color:black; text-align:center;">');
            $(".aqui").append('<td style="font-size:25px; font-weight:bold;">' + produtos.id + '</td>');
            $(".aqui").append('<td style="font-size:20px;">' + produtos.nome + '</td>');
            $(".aqui").append('<td style="font-size:20px;">' + produtos.categoria + '</td>');
            $(".aqui").append('<td style="font-size:20px;">R$' + produtos.preco + '</td>');
            $(".aqui").append('<td style="font-size:18px;">' + produtos.descricao + '</td>');
            $(".aqui").append('<td style="font-size:18px;"><img class="imagem" style="padding-left:50px; height:200px;" src="uploads/' + produtos.imagem + '"></td>');
            $(".aqui").append('<td><br><a style="color:white;" id="editar" data-toggle="modal" data-target="#modalExemplo" class="offset-sm-1 btn btn-info">Editar</a><br><br><a style="color:white; padding:5px;"id="remove"class="offset-sm-1 btn btn-danger">Remover</a></td>');
            $(".aqui").append('</tr>');
            $("#remove").click(function () {
                valor = produtos.id;

                $.ajax({
                    url: 'http://localhost/faculterca/produtos/' + valor,
                    type: 'DELETE',
                    dataType: 'text',
                    headers: {
                        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'
                    },
                    success: function (result) {
                        alert("Produto deletado");
                        window.location = 'http://localhost/faculterca/front';
                    }
                });
            });
            var caminho = "";
            var that = this;
            var valor = 0;
            //editar 
            $("#editar").click(function () {
                console.log(produtos.id);
                that.valor = produtos.id;
                $('#nomeModal').val(produtos.nome);
                $('#descricaoModal').val(produtos.descricao);
                $('#precoModal').val(produtos.preco);
                $('#cateogiraModal').val(produtos.categoria);
                $('#imagemModal').attr("src", 'uploads/' + produtos.imagem);



                $("#formModal").on("submit", function (event) {
                    var form_data = new FormData();
                    form_data.append('example1', $('#file').prop('files')[0]);
                    $.ajax({
                        url: 'http://localhost/faculterca/upload',
                        dataType: 'text',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form_data,
                        async: false,
                        type: 'post',
                        success: function (data) {
                            console.log(data);
                            that.caminho = data;
                        }
                    });
                    event.preventDefault();
                    var formData = {
                        'id': that.valor,
                        'nome': $('#nomeModal').val(),
                        'preco': $('#precoModal').val(),
                        'descricao': $('#descricaoModal').val(),
                        'categoria': $('#categoriaModal').val(),
                        'imagem': that.caminho,
                    };
                    console.log(formData);
                    $.ajax({
                        url: "http://localhost/faculterca/produtos/" + that.valor,
                        async: false,
                        type: "put",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(formData),
                        headers: {
                            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'
                        },
                        success: function () {
                            alert("Produto Cadastrado");
                        },
                        error: function () {
                            alert("erro ao cadastrar produto, verifique todos os campos foram preenchidos");
                        }
                    });
                });
            });
        },
        error: function (error) {
            console.log("Você nao se autentificou");
        }
    })
});

//selecionarcategoria
$("#selecionaCat").change(function () {
    if ($(this).val() != "Selecione") {
        console.log($(this).val());
        valor = $(this).val();
        $.ajax({
            url: 'http://localhost/faculterca/produtos/categoria/' + valor,
            type: 'GET',
            dataType: 'text',
            headers: {
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'
            },
            success: function (result) {
                produtos = JSON.parse(result);
                $("td").remove();
                $.each(produtos, function (i) {

                    $(".aqui").append('<tr style="background-color:white; color:red; text-align:center;">');
                    $(".aqui").append('<td style="font-size:25px; font-weight:bold;">' + produtos[i].id + '</td>');
                    $(".aqui").append('<td style="font-size:20px;">' + produtos[i].nome + '</td>');
                    $(".aqui").append('<td style="font-size:20px;">' + produtos[i].categoria + '</td>');
                    $(".aqui").append('<td style="font-size:20px;">R$' + produtos[i].preco + '</td>');
                    $(".aqui").append('<td style="font-size:18px;">' + produtos[i].descricao + '</td>');
                    $(".aqui").append('<td style="font-size:18px;"><img class="imagem" style="padding-left:50px; height:200px;" src="uploads/' + produtos[i].imagem + '"></td>');
                    $(".aqui").append('<td><br><button style="color:white;" data-toggle="modal" data-target="#modalExemplo" class="edita offset-sm-1 btn btn-info">Editar</button><br><br><a style="color:white; padding:5px;" class="remove offset-sm-1 btn btn-danger">Remover</a></td>');
                    $(".aqui").append('</tr>');

                    //remove
                    $(".remove").eq(i).click(function () {
                        valor = produtos[i].id;

                        $.ajax({
                            url: 'http://localhost/faculterca/produtos/' + valor,
                            type: 'DELETE',
                            dataType: 'text',
                            headers: {
                                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'
                            },
                            success: function (result) {
                                alert("Produto deletado");
                                window.location = 'http://localhost/faculterca/front';
                            }
                        });
                    });


                    var caminho = "";
                    var that = this;
                    var valor = 0;
                    //editar 
                    $(".edita").eq(i).click(function () {
                        console.log(produtos[i].id);
                        that.valor = produtos[i].id;
                        $('#nomeModal').val(produtos[i].nome);
                        $('#descricaoModal').val(produtos[i].descricao);
                        $('#precoModal').val(produtos[i].preco);
                        $('#cateogiraModal').val(produtos[i].categoria);
                        $('#imagemModal').attr("src", 'uploads/' + produtos[i].imagem);



                        $("#formModal").on("submit", function (event) {
                            var form_data = new FormData();

                            form_data.append('example1', $('#file').prop('files')[0]);
                            $.ajax({
                                url: 'http://localhost/faculterca/upload',
                                dataType: 'text',
                                cache: false,
                                contentType: false,
                                processData: false,
                                data: form_data,
                                async: false,
                                type: 'post',
                                success: function (data) {
                                    console.log(data);
                                    that.caminho = data;
                                }
                            });
                            event.preventDefault();
                            var formData = {
                                'id': valor,
                                'nome': $('#nomeModal').val(),
                                'preco': $('#precoModal').val(),
                                'descricao': $('#descricaoModal').val(),
                                'categoria': $('#categoriaModal').val(),
                                'imagem': that.caminho,
                            };
                            console.log(formData);
                            $.ajax({
                                url: "http://localhost/faculterca/produtos/" + produtos[i].id,
                                async: false,
                                type: "put",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(formData),
                                headers: {
                                    'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'
                                },
                                success: function () {
                                    alert("Produto Cadastrado");
                                },
                                error: function () {
                                    alert("erro ao cadastrar produto, verifique todos os campos foram preenchidos");
                                }
                            });
                        });
                    });
                });
            },
            error: function (error) {
                console.log("Você nao se autentificou");
            }
        })
    }
});

//buscarpromocao
$("#ofertas").click(function () {
    $.ajax({
        url: 'http://localhost/faculterca/produtos/promocao',
        type: 'GET',
        dataType: 'text',
        headers: {
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'
        },
        success: function (result) {
            produtos = JSON.parse(result);
            $("td").remove();
            $.each(produtos, function (i) {
                $(".aqui").append('<tr style="background-color:white; color:red; text-align:center;">');
                $(".aqui").append('<td style="font-size:25px; font-weight:bold;">' + produtos[i].id + '</td>');
                // $( ".aqui" ).append( '<td><img class="myImages" style="padding-left:50px; height:200px;" src="uploads/'+result[i].imagem+'"></td>');       
                $(".aqui").append('<td style="font-size:20px;">' + produtos[i].nome + '</td>');
                $(".aqui").append('<td style="font-size:20px;">' + produtos[i].categoria + '</td>');
                $(".aqui").append('<td style="color:red; font-size:20px;">R$' + produtos[i].preco + '</td>');
                $(".aqui").append('<td style="font-size:18px;">' + produtos[i].descricao + '</td>');
                $(".aqui").append('<td style="font-size:18px;"><img class="myImages" style="padding-left:50px; height:200px;" src="uploads/' + produtos[i].imagem + '"></td>');
                $(".aqui").append('<td><br><button style="color:white;" data-toggle="modal" data-target="#modalExemplo" class="edita offset-sm-1 btn btn-info">Editar</button><br><br><a style="color:white; padding:5px;" class="remove offset-sm-1 btn btn-danger">Remover</a></td>');
                $(".aqui").append('</tr>');

                //remove
                $(".remove").eq(i).click(function () {
                    valor = produtos[i].id;

                    $.ajax({
                        url: 'http://localhost/faculterca/produtos/' + valor,
                        type: 'DELETE',
                        dataType: 'text',
                        headers: {
                            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'
                        },
                        success: function (result) {
                            alert("Produto deletado");
                            window.location = 'http://localhost/faculterca/front';
                        }
                    });
                });

                var caminho = "";
                var that = this;
                var valor = 0;
                //editar 
                $(".edita").eq(i).click(function () {
                    console.log(produtos[i].id);
                    that.valor = produtos[i].id;
                    $('#nomeModal').val(produtos[i].nome);
                    $('#descricaoModal').val(produtos[i].descricao);
                    $('#precoModal').val(produtos[i].preco);
                    $('#cateogiraModal').val(produtos[i].categoria);
                    $('#imagemModal').attr("src", 'uploads/' + produtos[i].imagem);
                    $("#formModal").on("submit", function (event) {
                        var form_data = new FormData();
                        form_data.append('example1', $('#file').prop('files')[0]);
                        $.ajax({
                            url: 'http://localhost/faculterca/upload',
                            dataType: 'text',
                            cache: false,
                            contentType: false,
                            processData: false,
                            data: form_data,
                            async: false,
                            type: 'post',
                            success: function (data) {
                                console.log(data);
                                that.caminho = data;
                            }
                        });
                        event.preventDefault();
                        var formData = {
                            'id': valor,
                            'nome': $('#nomeModal').val(),
                            'preco': $('#precoModal').val(),
                            'descricao': $('#descricaoModal').val(),
                            'categoria': $('#categoriaModal').val(),
                            'imagem': that.caminho,
                        };
                        console.log(formData);
                        $.ajax({
                            url: "http://localhost/faculterca/produtos/" + produtos[i].id,
                            async: false,
                            type: "put",
                            contentType: "application/json",
                            dataType: "json",
                            data: JSON.stringify(formData),
                            headers: {
                                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsIm5vbWUiOiJGZWxpcGUifQ.5pMqZ62d4APOKC2jjMWox8M0IZDndDOZjO7thKl9TfA'
                            },
                            success: function () {
                                alert("Produto Cadastrado");
                            },
                            error: function () {
                                alert("erro ao cadastrar produto, verifique todos os campos foram preenchidos");
                            }
                        });
                    });
                });

            });
        },
        error: function (error) {
            console.log("Você nao se autentificou");
        }
    })
});
