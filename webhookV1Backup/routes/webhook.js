//Resposta de ERRO padrão-----
//const formatErrorResponse = require('../../../../utils/dialogFlow/df_Respose_Intent_fetchProduct/df_formatErrorResponse-SimpleText');

const respostaErroPadraoIntent = require('../utils/dialogFlow/df_Response-ErrorPadraoIntent/df_Response-ErrorPadraoIntent-SimpleText');


// Importa o módulo Express e cria um roteador
const express = require('express');
const router = express.Router();

// Importa a função para buscar produto
const df_fetchProduct = require('../responses/dialogFlow/intents/df_fetchProduct/df_fetchProduct');

// Intenção consultar produto pelo id
let df_IntentConsultaProdutoPeloId = 0;

// Rota POST para o /webhook e recebe o arquivo do DialogFlow
router.post('/', (req, res) => {
  // Identifica a intenção a partir do JSON recebido
  const intentName = req.body.queryResult.action;
  //const parametrosDeEntrada = req.body.queryResult.parameters;
  const produtoId = req.body.queryResult.parameters.produtoId;
  console.log("Intent consultar produto pelo Id acionada");
  console.log("Id do produto: " + produtoId);
  console.log(req.body);
//
  switch (intentName) {
    case 'consultar_usuarios_BD':
      df_IntentConsultaProdutoPeloId += 1;
      console.log("Função Consultar produto pelo Id acionada:" + df_IntentConsultaProdutoPeloId + " vez(es).");
      df_fetchProduct(req, res);
      break;
  
    case 'consutar_usuarios':
      // Seu código para tratar a intenção consultarProduto aqui
      console.log("Função Realizar deposito acionada.");
      // Chame a função apropriada, por exemplo:
      // df_fetchProductInfo(req, res);
      break;
    //Caso não encontrar a intenção, retorna simples mensagem
    default:
      const respostaErro = respostaErroPadraoIntent(intentName);
      console.log("Intenção não encontrada.");
      res.status(200).json(respostaErro);
      break;
  }
  
});

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;
