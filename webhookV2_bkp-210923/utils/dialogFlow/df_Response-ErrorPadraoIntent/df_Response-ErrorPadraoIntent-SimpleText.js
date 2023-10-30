// Função para formatar a resposta de erro para o Dialogflow
const formatErrorResponse = (intentName) => {
    let message;
    message = 'Intenção não encontrada.';
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
  