// Importa o módulo Express e cria um roteador
const express = require('express');
const router = express.Router();

// Importa a função para buscar produto
const fetchProduct = require('../responses/fetchProduct');

// Intenção consultar produto pelo id
let DF_intentConsultaProdutoPeloId = 0;

// Rota POST para o webhook e recebe o arquivo do DialogFlow
router.post('/', (req, res) => {
  // Identifica a intenção a partir do JSON recebido
  const intentName = req.body.queryResult.action;
  const parametrosDeEntrada = req.body.queryResult.parameters;
  const produtoId = req.body.queryResult.parameters.produtoId;
  console.log("Intent consultar produto pelo Id acionada");
  //console.log("Parameters da Intent: " + parametrosDeEntrada);
  console.log("Id do produto: " + produtoId);
  //console.log("O nome do produto é: " + fetchProduct.produtoNome);
  

  // Verifica se a intenção é 'buscar_produto'
  if (intentName === 'consultar_usuarios_BD') {
    // Adiciona mais uma para intenção
    DF_intentConsultaProdutoPeloId += 1;
    console.log("Função Consultar produto pelo Id acionada:" + DF_intentConsultaProdutoPeloId + " vez(es).");
    // Chama a função para buscar o produto e formatar a resposta
    fetchProduct(req, res);
    //console.log("valor de intent: " + fetchProduct);
  }
});

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;
