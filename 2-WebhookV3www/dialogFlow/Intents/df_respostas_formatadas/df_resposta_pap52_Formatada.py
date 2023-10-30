def formatar_resposta_para_card(resposta):
    # Formata a resposta em um card para o Dialogflow
    card_resposta = {
        "fulfillmentMessages": [
            {
                "card": {
                    "title": "Resposta do Documento PAP-52",
                    "subtitle": resposta,
                    "buttons": [
                        {
                            "text": "Ver mais detalhes",
                            "postback": "https://example.com/detalhes"
                        },
                        {
                            "text": "Outra ação",
                            "postback": "https://example.com/outra_acao"
                        }
                    ]
                }
            }
        ]
    }
    return card_resposta
