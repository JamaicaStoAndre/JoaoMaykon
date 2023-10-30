function df_Response_ConsultaCarros(carrosCadastrados) {
    return {
        "fulfillmentMessages": [
            {
                "card": {
                    "title": "Carros Cadastrados",
                    "subtitle": "Aqui estão os carros cadastrados para este usuário" + carrosCadastrados,
                }
            }
        ]
    };
}

  // Exporta a função para ser usada em outros arquivos
  module.exports = df_Response_ConsultaCarros;
  