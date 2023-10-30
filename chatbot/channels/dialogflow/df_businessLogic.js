const df_fetchProduct = require('./df_intents/df_fetchProduct/df_fetchProduct.js');
const df_fetchProductError = require('./df_intents/df_fetchProduct/df_fetchProductError.js');
const df_consultarUsuario = require('./df_intents/df_fetchUser/df_fetchUser.js');
const df_consultarUsuarioError = require('./df_intents/df_fetchUser/df_fetchUserError.js');

let df_intent_ConsultaProdCod = 0;

const df_businessLogic = (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  console.log("Intenção acionada df_businessLogic.js " + intentName);

  switch(intentName) {
    case 'buscar_produto':
      df_intent_ConsultaProdCod += 1;
      console.log("df_businessLogic.js: Intenção consultar produto pelo Id acionada: " + df_intent_ConsultaProdCod + " vez(es");
      //  
      df_fetchProduct(req, res)
      .catch(error => {
          df_fetchProductError(req, res);
        });
    break;
      //
    case 'consultar_usuario':
      df_consultarUsuario(req, res)
        .catch(error => {
          df_consultarUsuarioError(req, res);
        });
      break;
    default:
      res.status(400).json({ error: 'Intenção não suportada' });
  }
};

module.exports = df_businessLogic;