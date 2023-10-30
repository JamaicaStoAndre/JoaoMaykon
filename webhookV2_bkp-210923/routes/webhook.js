//Resposta de ERRO padrão-----
//const formatErrorResponse = require('../../../../utils/dialogFlow/df_Respose_Intent_fetchProduct/df_formatErrorResponse-SimpleText');


//-=-==-2 - Importa a resposta de erro padrão caso não encontre a intenção.
const respostaErroPadraoIntent = require('../utils/dialogFlow/df_Response-ErrorPadraoIntent/df_Response-ErrorPadraoIntent-SimpleText');


// Importa o módulo Express e cria um roteador
const express = require('express');
const router = express.Router();

// -=-=-==-3 Importar arquivos de execução de intenções
//
//-=-= Importar a função "consultar_usuarios_BD"
const df_fetchProduct = require('../responses/dialogFlow/intents/df_fetchProduct/df_fetchProduct');

// Importa o arquivo para tratar a intenção: consultar carros no cadastro do usuário
const consultaCarros = require('../responses/dialogFlow/intents/df_ConsultaCarros/df_consultarCarros')

//-=-=-=Variáveis para dados:
// Intenção consultar produto pelo id
let df_IntentConsultaProdutoPeloId = 0;

//Intenção Consutar carros
let df_IntentConsultarCarros = 0;

//=-=-=-=-=POST-=-=-=-=
// Rota /webhook e recebe o arquivo do DialogFlow
router.post('/', (req, res) => {
  // Identifica a intenção a partir do JSON recebido
  const intentName = req.body.queryResult.intent.displayName;
  //
  console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
  console.log("IntentName: " + intentName);
  console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
  console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
  console.log(req.body);
  console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=")


//
// Analisa a intenção "intentName" e envia a requisição para o arquivo correto 
switch (intentName) {
    case 'consultar_usuarios_BD':
      df_IntentConsultaProdutoPeloId += 1;
      // Armazena o Id do produto
      const produtoId = req.body.queryResult.parameters.produtoId;
      console.log("Função Consultar produto pelo Id acionada. " + df_IntentConsultaProdutoPeloId + " vez(es).");
      console.log("Id do produto: " + produtoId);
      df_fetchProduct(req, res);
      break;
  
    case 'consutar_usuarios':
      // Seu código para tratar a intenção consultarProduto aqui
      console.log("Função Realizar deposito acionada.");
      // Chame a função apropriada, por exemplo:
      // df_fetchProductInfo(req, res);
      break;
      //
      //SchoolGuardiam WebHook
      case '2-#ConsultarCarrosCadastrados':
      // Função consultar Carros
      df_IntentConsultarCarros += 1;
      console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
      console.log("Função Consultar carros acionada: " + df_IntentConsultarCarros + "vez(es)");
      console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
      console.log("Tipo de consultar carros: " + typeof consultaCarros);
      // Chamar função de consulta carros;
      consultaCarros(req, res);
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