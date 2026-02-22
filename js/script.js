class Produto {
    constructor(id, nome, preco, descricao, categoria) {

    }
}

class Catalogo {
    constructor() {
        this.produtos = this.carrearProdutos() || [];
    }
}

  function adicionarProduto(produto) {
    this.produtos.push(produto);
    this.salvarProdutos();
}


function removerProduto(id) {
    this.produtos = this.produtos.filter(produto => produto.id !== id);
         this.salvarProdutos();
}

  function editarProduto(id, novosDados) {
    const produto = this.produtos.find(p => p.id === id);
    if(produto) {
        Object.assign(produto, novosDados);
        this.salvaProdutos();
    }

}


function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(this.produtos));
}

function carregarProdutos() {
    return JSON.parse(localStorage.getItem("produtos"));
}


