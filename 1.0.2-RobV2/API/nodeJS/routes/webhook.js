const respostaErroPadraoIntent = require('../respostas/res_dialogflow/df_Response-ErrorPadraoIntent-SimpleText');
//
//importar o Loger para registrar os Logs
const { logIntentNotFound } = require('../log/logService')

// Importa o módulo Express e cria um roteador
const express = require('express');
const router = express.Router();

// -=-=-==- Importar arquivos de execução de intenções
//
// Função para importar o arquivo e tratar a intenção: consultar carros no cadastro do usuário
const consultaCarros = require('../intents/df_intents/df_intent_consultarCarros');
//

//-=-=-=Variáveis para dados:
//
//-=-=-=-=-=-=----Intenção Consutar carros
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
    break;
    //
    //SchoolGuardiam WebHook
    //-=-=-=Função consultar Carros
  case '2-#ConsultarCarrosCadastrados':
    //
    df_IntentConsultarCarros += 1;
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
    console.log("Função Consultar carros acionada: " + df_IntentConsultarCarros + "vez(es)");
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
    console.log("Tipo de consultar carros: " + typeof consultaCarros);
    // Chamar função de consulta carros;
    consultaCarros(req, res);
    break;
    //
    //-=-=-=Função consultar responsáveis cadastrados
    case '3#Consultar_resonsaveis':
    //
    df_IntentConsultarResponsaveis += 1;
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
    console.log("Função consultar responsáveis cadastrados acionada: " + df_IntentConsultarResponsaveis + "vez(es)");
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
    console.log("Tipo de consultar responsáveis: " + typeof consultaResponsaveis);
    // Chamar função de consulta carros;
    consultaResponsaveis(req, res);
    break;
  //Caso não encontrar a intenção, retorna simples mensagem
  default:
    const respostaErro = respostaErroPadraoIntent(intentName);//Chama a função de  resposta de erro padrão
    console.log("Intenção não encontrada.");
    //log
    logIntentNotFound(`Webhook.js: Intenção não encontrada: ${intentName}`);
    //retorno
    res.status(200).json(respostaErro);
    break;
}

});

// Exporta o roteador para ser usado em outros arquivos
module.exports = router;