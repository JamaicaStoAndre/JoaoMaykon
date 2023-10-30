// Função para formatar a resposta do produto para o Dialogflow
function df_Response_ConsultaCarros(carrosCadastrados) {
    // Retorna o objeto de resposta formatado
    return {
        "fulfillmentMessages": [
          {
            "card": {
              "title": "Carros Cadastrados",
              "subtitle": "card text",
              "imageUri": "https://example.com/images/example.png",
              "buttons": [
                {
                  "text": "esse é o id do usuario " + carrosCadastrados,
                  "postback": "https://example.com/path/for/end-user/to/follow"
                }
              ]
            }
          }
        ]
      }
  }
  
  // Exporta a função para ser usada em outros arquivos
  module.exports = df_Response_ConsultaCarros;
  