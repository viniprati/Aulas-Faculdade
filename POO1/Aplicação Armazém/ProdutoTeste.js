import { Produto } from "./Produto.js";
import { Fornecedor } from "./Fornecedor.js";

console.log("===== Testes da classe Produto =====");

const fornecedor = new Fornecedor(
    "Distribuidora Central",
    "12.345.678/0001-90",
    "(18)99999-9999",
    "Rua das Flores, 100",
    5000
);

const produto = new Produto("Arroz 5kg", 20, 27.9, 40);
produto.fornecedor = fornecedor;

console.log("Produto criado:", produto.toString());
console.log("Descricao:", produto.descricao);
console.log("Preco de compra:", produto.precoCompra);
console.log("Preco de venda:", produto.precoVenda);
console.log("Quantidade em estoque:", produto.quantidadeEstoque);
console.log("Vendas mensais iniciais:", produto.vendasMensais);
console.log("Fornecedor:", produto.fornecedor.razaoSocial);

produto.precoCompra = 21;
produto.precoVenda = 29.5;
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
console.log("JSON do produto:", produto.stringify());
