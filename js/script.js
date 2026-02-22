class Produto {
  constructor(id, nome, preco, descricao, categoria) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
    this.categoria = categoria;
  }
}

class Catalogo {
  constructor() {
    this.produtos = this.carregarProdutos() || [];
  }

  adicionarProduto(produto) {
    this.produtos.push(produto);
    this.salvarProdutos();
  }

  removerProduto(id) {
    this.produtos = this.produtos.filter((produto) => produto.id !== id);
    this.salvarProdutos();
  }

  editarProduto(id, novosDados) {
    const produto = this.produtos.find((p) => p.id === id);
    if (produto) {
      Object.assign(produto, novosDados);
      this.salvarProdutos();
    }
  }

  salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(this.produtos));
  }

  carregarProdutos() {
    return JSON.parse(localStorage.getItem("produtos"));
  }
}

// Criação de instância do catálogo
const catalogo = new Catalogo();

// Função para atualizar a tabela de produtos na inteface
function atualizarTabela() {
  const tabela = document.getElementById("product-table-body");
  tabela.innerHTML = "";

  catalogo.produtos.forEach((produto) => {
    const row = document.createElement("tr");

    row.innerHTML = ` 
      <td>${produto.id}</td> 
      <td>${produto.nome}</td> 
      <td>${produto.preco}</td> 
      <td>${produto.categoria}</td> 
       <td> 
        <button 
onclick="excluirProduto(${produto.id})">Excluir</button> 
        <button 
onclick="buscarDetalhes(${produto.id})">Detalhes</button> 
      </td> 
    `;

    tabela.appendChild(row);
  });
}

// Formulário para adicionar um novo produto
document.getElementById("add-product-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("name").value;
  const preco = parseFloat(document.getElementById("price").value);
  const descricao = document.getElementById("description").value;
  const categoria = document.getElementById("category").value;

  const id = catalogo.produtos.length
    ? catalogo.produtos[catalogo.produtos.length - 1].id + 1
    : 1;
  const produto = new Produto(id, nome, preco, descricao, categoria);

  catalogo.adicionarProduto(produto);
  atualizarTabela();

  e.target.reset();
});

// Função para excluir um produto
function excluirProduto(id) {
  catalogo.removerProduto(id);
  atualizarTabela();
}

// Função para buscar detalhes de um produto
function buscarDetalhes(id) {
  const produto = catalogo.produtos.find((p) => p.id === id);
  if (produto) {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        alert(`Detalhes: ${data.description}`);
      })
      .catch((err) => console.error("Erro ao buscar API", err));
  }
}

// Inicializa a tabela com os produtos carregados
atualizarTabela();
