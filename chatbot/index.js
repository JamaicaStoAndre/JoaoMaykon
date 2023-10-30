// Importar pacotes e módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware');

// Inicializar o servidor Express
const app = express();

// Configura o middleware para parsear JSON
app.use(bodyParser.json());

// Configurar o middleware para analisar o corpo das requisições
app.use(express.json());  // Você pode usar isso ou bodyParser.json()

// Middleware de erro
app.use(errorHandlingMiddleware);
//
console.log("Passando pelo index.js");

// Registra o roteador para a rota `/webhook`
app.use('/webhook', routes);

// Configurar porta e iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
