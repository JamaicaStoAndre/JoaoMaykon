const mysql = require('mysql');

// Configurações do banco de dados
const dbConfig = {
  host: 'localhost',
  user: 'rob',
  password: 'Ch4tB0t2023',
  database: 'schoolGuardian'
};

// Criação da conexão
const connection = mysql.createConnection(dbConfig);
module.exports = connection;