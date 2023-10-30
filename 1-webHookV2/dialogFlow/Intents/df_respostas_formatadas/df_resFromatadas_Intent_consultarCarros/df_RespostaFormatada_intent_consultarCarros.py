# dialogFlow/Intents/df_respostas_formatadas/df_resFromatadas_Intent_consultarCarros/df_RespostaFormatada_intent_consultarCarros.py

def df_RespostaFormatada_intent_consultarCarros(carrosCadastrados):
    # Criar uma lista de cartões, um para cada carro
    cards = []
    for carro in carrosCadastrados:
        subtitleText = f"Marca: {carro[0]}, Modelo: {carro[1]}, Cor: {carro[2]}, Placa: {carro[3]}"
        card = {
            "card": {
                "title": "Carros Cadastrados",
                "subtitle": subtitleText,
                "imageUri": carro[4],
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
        }
        cards.append(card)

    # Retorna o objeto de resposta formatado
    return {
        "fulfillmentMessages": cards
    }
