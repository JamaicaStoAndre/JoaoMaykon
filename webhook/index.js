// Importa os módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const webhookRoute = require('./routes/webhook');

// Cria a aplicação Express
const app = express();

// Configura o middleware para parsear JSON
app.use(bodyParser.json());

//-=-=-= 1: Rotas
// Define a rota para o webhook
app.use('/webhook', webhookRoute);

// Inicia o servidor na porta 3000 ou na porta definida no ambiente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
