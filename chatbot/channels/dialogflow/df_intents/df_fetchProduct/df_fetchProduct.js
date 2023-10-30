const db = require('../../../../db/db'); // ajuste o caminho conforme sua estrutura de projeto
const formatFetchProductResponse = require('./df_fetchProductResponse');
const formatFetchProductError = require('./df_fetchProductError');

module.exports = function fetchProduct(req, res) {
  const productId = req.body.queryResult.parameters.productId;
  
  const query = 'SELECT * FROM products WHERE id = ?';
  
  db.query(query, [productId], (err, rows) => {
    if (err) {
      // Log do erro e envio de uma resposta formatada de erro
      console.error("df_fetchProduct.js: erro ao enviar resposta formatada " + err);
      const errorResponse = formatFetchProductError('fetchProduct');
      return res.status(200).json(errorResponse);
    }
    
    if (rows.length === 0) {
      // Produto não encontrado; envio de uma resposta formatada de erro
      console.error("df_fetchProduct.js: Produto não encontrado. ");
      const errorResponse = formatFetchProductError('fetchProduct');
      return res.status(200).json(errorResponse);
    }
    
    // Produto encontrado; envio de uma resposta formatada bem-sucedida
    const product = rows[0];
    const successResponse = formatFetchProductResponse(product);
    return res.status(200).json(successResponse);
  });
};
