// Função para formatar a resposta do produto para o Dialogflow
function formatProductResponse(produtoNome) {
    // Retorna o objeto de resposta formatado
    return {
      fulfillmentText: `O nome do produto é ${produtoNome}.`,
      payload: {
        google: {
          expectUserResponse: true,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: `O nome do produto é ${produtoNome}.`
                }
              }
            ]
          }
        },
        produtoNome: produtoNome
      }
    };
  }
  
  // Exporta a função para ser usada em outros arquivos
  module.exports = formatProductResponse;
  