// Função para formatar a resposta de erro para o Dialogflow
const formatErrorResponse = (intentName) => {
    let message;
  
    // Baseado na intenção, você pode personalizar a mensagem
    if (intentName === 'buscar_produto') {
      message = 'Desculpe, não encontrei seu produto pelo Id. Por favor, tente com um ID diferente.';
    } else {
      message = 'Intenção não encontrada.';
    }
  
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
  