# dialogFlow/Intents/df_respostas_formatadas/df_resFromatadas_Intent_consultarCarros/df_ERROR_RespostaFormat_intent_consultarCarros.py

def df_ERROR_RespostaFormat_intent_consultarCarros(id_usuario):
    """
    Retorna uma resposta formatada de erro para o caso em que a consulta não encontre o solicitado.
    """
    mensagem_erro = f"Desculpe, não encontramos carros cadastrados para o ID de usuário: {id_usuario}."
    
    return {
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [mensagem_erro]
                }
            }
        ]
    }
