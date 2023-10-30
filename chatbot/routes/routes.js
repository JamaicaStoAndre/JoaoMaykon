const express = require('express');
const router = express.Router();
const channelDetection = require('../middleware/channelDetection');
const dialogflowRouter = require('../channels/dialogflow/df_businessLogic');
const whatsappRouter = require('../channels/whatsapp/wa_businessLogic');
console.log("cheguei no routes.js ")
// Rota para webhook
//router.post('/webhook', (req, res) => {
    router.post('/', (req, res) => {
  
  // Validação do esquema de entrada. Verifica se o corpo da requisição existe
  if (!req.body || !req.body.queryResult || !req.body.queryResult.intent) {
    console.log("ERRO 400");
    return res.status(400).json({ error: 'Esquema de entrada inválido' });
  }

  // Detecta o canal usando o middleware
  const channel = channelDetection(req);
  console.log("Routes.js: canal encontrado: " + channel);
  console.log(req.body);

  // Validação de canal suportado
  const supportedChannels = ['dialogflow', 'whatsapp', 'telegram'];
  if (!supportedChannels.includes(channel)) {  //verifica se o canal detectado está na lista de canais suportados; se não estiver, entra no bloco do if para retornar um erro.
    return res.status(400).json({ error: 'routes.js: Canal não suportado' });
  }

  // Encaminhar para a rota correspondente usando um switch
  switch(channel) {
    case 'dialogflow':
      dialogflowRouter(req, res);
      console.log("routes.js: canal: DialogFlow")
      break;
    case 'whatsapp':
      whatsappRouter(req, res);
      console.log("routes.js: canal: Whatsapp")
      break;
    // Outros canais podem ser adicionados aqui
    default:
        console.log("routes.js: Canal não suportado");
      res.status(400).json({ error: 'Canal não suportado' });
  }
});

module.exports = router;