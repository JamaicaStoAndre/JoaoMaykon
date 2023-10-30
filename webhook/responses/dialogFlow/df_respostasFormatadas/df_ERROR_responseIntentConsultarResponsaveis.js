// Função para formatar a resposta de consulta de responsáveis
const df_Response_ConsultaResponsaveis = (id_usuario) => {
    let message = "Não encontrado para o id: " + id_usuario;
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

// Exporta a função para ser usada em outros arquivos
module.exports = df_Response_ConsultaResponsaveis;
