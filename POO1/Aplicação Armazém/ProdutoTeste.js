import { Produto } from "./Produto.js";

console.log("===== Testes da classe Produto =====");

const produto = new Produto("Arroz 5kg", 27.9, 40);

console.log("Produto criado:", produto.toString());
console.log("Descricao:", produto.descricao);
console.log("Preco:", produto.preco);
console.log("Quantidade em estoque:", produto.quantidadeEstoque);
console.log("Vendas mensais iniciais:", produto.vendasMensais);

produto.preco = 29.5;
produto.quantidadeEstoque = 50;
produto.setQtdVendasMes(1, 12);
produto.setQtdVendasMes(2, 8);
produto.comprar(10);
produto.vender(5, 3);

console.log("Venda de janeiro:", produto.getQtdVendasMes(1));
console.log("Venda de fevereiro:", produto.getQtdVendasMes(2));
console.log("Venda de marco apos vender 5 unidades:", produto.getQtdVendasMes(3));
console.log("Total vendido no ano:", produto.consultarQuantidadeVendidaAno());
console.log("Produto atualizado:", produto.toString());
console.log("Vetor de vendas atualizado:", produto.vendasMensais);
