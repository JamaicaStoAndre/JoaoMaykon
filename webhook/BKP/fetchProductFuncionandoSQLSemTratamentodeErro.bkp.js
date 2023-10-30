// Importa a conexão com o banco de dados e a função de formatação
const db = require('../db/db');
const formatProductResponse = require('../utils/formatProductResponse');

// Função para buscar produto pelo ID e retornar a resposta
const fetchProduct = (req, res) => {
  // Extrai o ID do produto dos parâmetros da consulta
  const produtoId = req.body.queryResult.parameters.produtoId;

  // Consulta SQL para buscar o nome do produto pelo ID
  const query = 'SELECT nome FROM produtos WHERE id = ?';
  db.query(query, [produtoId], (err, rows) => {
    if (err) throw err;

    // Obtém o nome do produto a partir do resultado da consulta
    const produtoNome = rows[0].nome;
    
    // Usa a função de formatação para criar a resposta
    const resposta = formatProductResponse(produtoNome);
    
    // Envia a resposta formatada
    res.status(200).json(resposta);
  });
};

// Exporta a função para ser usada em outros arquivos
module.exports = fetchProduct;
