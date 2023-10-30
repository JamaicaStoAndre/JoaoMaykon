// Importação dos módulos para tratamento de cada canal
const dialogflowBusinessLogic = require('../channels/dialogflow/df_businessLogic');
const whatsappBusinessLogic = require('../channels/whatsapp/wa_businessLogic');

// Função para rotear o canal
const channelRouter = (req, res) => {
  // Identifica o canal a partir da requisição
  const channel = req.body.platform || '';
  console.log("channelRouter.js: Canal detectado: " + channel);

  // Validação de canais suportados
  const supportedChannels = ['dialogflow', 'whatsapp'];

  if (!supportedChannels.includes(channel)) {
    // Se o canal não for suportado, retorna um erro 400
    console.log("channelRouter.js: Canal não suportedo");
    return res.status(400).json({ error: 'channelRouter.js.laço if: Canal não suportado. ' });
  }

  // Roteamento baseado no canal
  switch(channel) {
    case 'dialogflow':
      dialogflowBusinessLogic(req, res);
      break;
    case 'whatsapp':
      whatsappBusinessLogic(req, res);
      break;
    default:
      res.status(400).json({ error: 'channelRouter.js.laço switch: Canal não suportado. ' });
  }
}

module.exports = channelRouter;
