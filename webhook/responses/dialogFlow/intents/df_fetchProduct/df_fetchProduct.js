// Importa a conexão com o banco de dados 
const db = require('../../../../db/db');

//Formata a resposta com um simples texto para DF
const formatProductResponse = require('../../../../utils/dialogFlow/df_Respose_Intent_fetchProduct/df_formatProductResponse-SimpleText');
//
//----Resposta de ERRO padrão-----
const formatErrorResponse = require('../../../../utils/dialogFlow/df_Respose_Intent_fetchProduct/df_formatErrorResponse-SimpleText');

// Função para buscar produto pelo ID e retornar a resposta
const fetchProduct = (req, res) => {
  //
  // Extrai o nome da intenção dos parâmetros da consulta
  const intentName = req.body.queryResult.intent.displayName;
  //
  // Extrai o ID do produto dos parâmetros da consulta
  const produtoId = req.body.queryResult.parameters.produtoId;
  //
  // Consulta SQL para buscar o nome do produto pelo ID
  const query = 'SELECT nome FROM produtos WHERE id = ?';

  // Executa a consulta ao banco de dados
  db.query(query, [produtoId], (err, rows) => {
    // Verifica se ocorreu um erro na consulta
    if (err) {
      console.error('Erro na consulta SQL: ' + err);
      console.log('df_fetchProduct.js: Erro na consulta SQL: ' + err);
      // Retorna um erro 500 (Erro Interno do Servidor) se houver um problema na consulta
      return res.status(500).json({ error: 'df_fetchProduct: Resposta para o solicitante da API: Erro SQL interno do servidor.' });
    }

    // Verifica se algum registro foi retornado
    if (rows.length === 0) {
      // Se nenhum registro foi encontrado, retorna um erro 404 (Não Encontrado), mas utilizando 200 para dialogflow receber a msg
      const respostaErro = formatErrorResponse(intentName);
      console.log('df_fetchProduct: Nenhum registro encontrado, retornando erro.');
      //return res.status(200).json({ message: 'Produto não encontrado. Retorne com o id correto por favor:' });
      return res.status(200).json(respostaErro);
    }

    // Obtém o nome do produto a partir do resultado da consulta
    const produtoNome = rows[0].nome;
    
    // Usa a função de formatação para criar a resposta
    const resposta = formatProductResponse(produtoNome);
    
    // Envia a resposta formatada com status 200 (OK)
    res.status(200).json(resposta);
  });
};

// Exporta a função para ser usada em outros arquivos
module.exports = fetchProduct;
