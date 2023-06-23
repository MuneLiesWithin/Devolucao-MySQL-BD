let idSelecionado = null;

function carregarDados(){
    var myRequest = new Request('http://localhost:3000/devolucoes');
    fetch(myRequest)
        .then(response => {
            if(response.status === 200){
                return response.json();
            } 
            else{
                throw new Error('ERRO!');
            }
        })
        .then(response => {
            recuperarDados(response);
        }).catch(error => {
            console.error(error);
        });
}

function recuperarDados(obj){
    const tbl = document.getElementById('devolucoes');
    tbl.innerHTML = '';
    for(let index = 0; index < obj.length; index++){
        const element = obj[index];
        const ul = document.createElement('ul');
        ul.onclick = function(){
            selecionar(element);
        }
        ul.innerHTML =
            '<li>' + '<a href="#">' + element.nome + ' ' + 'devolveu' + ' ' + element.livro + '</a>' + '</li>'
        tbl.appendChild(ul);
    }
}

function selecionar(obj){
    document.getElementById('nome').value = obj.nome;
    document.getElementById('livro').value = obj.livro;
    let bt = document.getElementById('excluir');
    bt.disabled = null;
    idSelecionado = obj.id;
}

function resetForm(){
    document.getElementById('nome').value = null;
    document.getElementById('livro').value = null;
    let bt = document.getElementById('excluir');
    bt.disabled = 'disabled';
    idSelecionado = null;
}

function registrar(){
    const devolucao = {
        id: idSelecionado,
        nome: document.getElementById('nome').value,
        livro: document.getElementById('livro').value
    }

    fetch('http://localhost:3000/devolucoes', {
        method: 'POST', 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(devolucao),
    }).then((response) => response.text())
        .then((responseText) => {
            alert(responseText);
        });
    resetForm();
}

function excluir(){
    fetch('http://localhost:3000/devolucoes/' + idSelecionado, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.text())
        .then((responseText) => {
            alert(responseText);
        });
    resetForm();
}