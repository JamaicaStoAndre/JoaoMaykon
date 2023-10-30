module.exports = function formatFetchProductError(intentName) {
    return {
      fulfillmentText: 'Desculpe, não conseguimos encontrar o produto que você está procurando.',
      fulfillmentMessages: [
        {
          text: {
            text: [
              'Desculpe, não conseguimos encontrar o produto que você está procurando.'
            ]
          }
        }
      ],
      // Outros campos de erro aqui
    };
  };
  