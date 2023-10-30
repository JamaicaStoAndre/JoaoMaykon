module.exports = function formatFetchProductResponse(product) {
    return {
      fulfillmentText: `O produto ${product.name} custa ${product.price}.`,
      fulfillmentMessages: [
        {
          text: {
            text: [
              `O produto ${product.name} custa ${product.price}.`
            ]
          }
        }
      ],
      // Você pode adicionar outros campos aqui conforme necessário
    };
  };
  