// Função para montar a resposta
function buildResponseMessage(message) {
    return {
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [message]
                }
            }
        ]
    };
}

module.exports = buildResponseMessage; // Exportar a função