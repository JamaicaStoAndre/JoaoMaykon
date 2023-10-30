function ddf_ERROR_Response_padraoSimples(id_usuario) {
    return {
        "fulfillmentMessages": [
            {
                "card": {
                    "title": "Não encontrado",
                    "subtitle": "Este é seu id? : " + id_usuario,
                }
            }
        ]
    };
}

  // Exporta a função para ser usada em outros arquivos
  module.exports = df_Response_ConsultaCarros;
  