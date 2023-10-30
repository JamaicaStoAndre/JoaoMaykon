function df_Response_ConsultaCarros(carrosCadastrados) {
    // Criar um array de cartões, um para cada carro
    const cards = carrosCadastrados.map(carro => {
        const subtitleText = `Marca: ${carro.marca}, Modelo: ${carro.modelo}, Cor: ${carro.cor}, Placa: ${carro.placa}`;
        return {
            "card": {
                "title": "Carros Cadastrados",
                "subtitle": subtitleText,
                "imageUri": carro.foto_url,  // URL da imagem do carro
                "buttons": [
                    {
                        "text": "Ver mais detalhes",
                        "postback": "https://example.com/detalhes"
                    },
                    {
                        "text": "Atualizar",
                        "postback": "https://example.com/atualizar"
                    }
                ]
            }
        };
    });

    // Retorna o objeto de resposta formatado
    return {
        "fulfillmentMessages": cards
    };
}

// Exporta a função para ser usada em outros arquivos
module.exports = df_Response_ConsultaCarros;