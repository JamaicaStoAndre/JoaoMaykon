// Função para formatar a resposta de erro para o Dialogflow
const formatErrorResponse = (id_usuario) => {
    let message;
    message = 'Cadastro não encontrado para o id: '+ id_usuario;
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
  
  module.exports = formatErrorResponse;
  