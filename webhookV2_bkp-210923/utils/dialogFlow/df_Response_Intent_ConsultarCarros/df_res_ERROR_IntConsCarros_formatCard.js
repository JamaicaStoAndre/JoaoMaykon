// Função para formatar a resposta de erro para o Dialogflow
const df_ERROR_Response_ConsultarCarros = (id_usuario) => {
    let message;
    message = 'Veiculo não encontrado com o id: ' + id_usuario;
// Formatar a resposta para o Dialogflow
    const formattedResponse = {
      "fulfillmentText": message,
      "fulfillmentMessages": [
        {
          "text": {
            "text": [message]
          }
        }
      ]
    };
  
    return formattedResponse;
  };
  
  module.exports = df_ERROR_Response_ConsultarCarros;
  