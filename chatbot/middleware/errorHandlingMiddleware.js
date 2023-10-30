// middleware/errorHandlingMiddleware.js
const fs = require('fs');
const path = require('path');

const errorHandlingMiddleware = (err, req, res, next) => {
  const logPath = path.join(__dirname, '..', 'log', 'webhook_error.log');
  const logMessage = `[${new Date().toISOString()}] - ${err.message}\n`;
  
  fs.appendFile(logPath, logMessage, (error) => {
    if (error) {
      console.error('Failed to write to log file:', error);
    }
  });
  console.log("Midleware de erro. Erro encontrado.Verifique os logs em webhook_error.log. ");
  res.status(500).json({ error: 'Ocorreu um erro, verifique os logs.' });
};

module.exports = errorHandlingMiddleware;
