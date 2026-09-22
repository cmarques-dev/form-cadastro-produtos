// Pega referências dos elementos que já existem no HTML
const form_CriarProduto = document.querySelector("#form-add-product");
const lista_Produtos = document.querySelector("#lista-produtos");

let produtos = [];
let contador = 1;

function renderizarProdutos() {
  lista_Produtos.innerHTML = "";

  produtos.forEach(function (produto) {
    const item = document.createElement("li");
    item.textContent = `[${produto.id}] ${produto.nome} - R$ ${produto.preco.toFixed(2)} (${produto.quantidade} un.)`;
    lista_Produtos.appendChild(item);
  });
}

form_CriarProduto.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = document.querySelector("#nome").value;
  const preco = Number(document.querySelector("#preco").value);
  const quantidade = Number(document.querySelector("#quantidade").value);

  produtos.push({id: contador, nome: nome, preco: preco, quantidade: quantidade});
  contador ++;

  renderizarProdutos();
  form_CriarProduto.reset();
});

const form_ModificarProduto = document.querySelector("#form-change-product")
const botao_Remover = document.querySelector("#remove")

form_ModificarProduto.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const id_product = Number(document.querySelector("#id-produto").value);
  const produto = produtos.find(function (p) {
    return p.id === id_product;
  });

  if (!produto) {
    alert(`Produto de ID ${id} nao encontrado.`);
    return;
  }

  produto.nome = document.querySelector("#alterar-nome").value;
  produto.preco = Number(document.querySelector("#alterar-preco").value);
  produto.quantidade = Number(document.querySelector("#alterar-quantidade").value);

  renderizarProdutos();
  form_ModificarProduto.reset();
})

botao_Remover.addEventListener("click", function () {
  const valorId = document.querySelector("#id-produto").value;

  if (valorId === "") {
    alert("Informe o ID do produto que deseja remover.");
    return;
  }

  const id = Number(valorId);
  const existe = produtos.some(function (p) {
    return p.id === id;
  });

  if (!existe) {
    alert(`Produto com ID ${id} não encontrado.`);
    return;
  }

  produtos = produtos.filter(function (p) {
    return p.id !== id;
  });

  renderizarProdutos();
  form_ModificarProduto.reset();
});

