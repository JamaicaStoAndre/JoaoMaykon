# from flask import jsonify

# def consultar_carros():
#     # Aqui você pode adicionar a lógica para consultar carros no banco de dados
#     # Por enquanto, apenas retornamos uma mensagem de exemplo
#     return jsonify({"fulfillmentText": "Aqui estão os carros cadastrados..."})
from flask import jsonify, request
import mysql.connector

# Importando as configurações do banco de dados
from bancoDados.mysql_schoolGuardian import config

# Importando as respostas formatadas
#from dialogFlow.Intents.df_respostas_formatadas.df_resFromatadas_Intent_consultarCarros import df_RespostaFormatada_intent_consultarCarros
from dialogFlow.Intents.df_respostas_formatadas.df_resFromatadas_Intent_consultarCarros.df_RespostaFormatada_intent_consultarCarros import df_RespostaFormatada_intent_consultarCarros
from dialogFlow.Intents.df_respostas_formatadas.df_resFromatadas_Intent_consultarCarros.df_ERROR_RespostaFormat_intent_consultarCarros import df_ERROR_RespostaFormat_intent_consultarCarros
#from dialogFlow.Intents.df_respostas_formatadas.df_resFromatadas_Intent_consultarCarros import df_ERROR_RespostaFormat_intent_consultarCarros
def consultar_carros():
    # Conecta ao banco de dados
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()

    # Extrai o ID do usuário a partir do parâmetro enviado pelo Dialogflow
    # (Ajuste conforme a estrutura do seu JSON)
    id_usuario = request.json["queryResult"]["parameters"]["id"]
    print(f'Id do usuário: {id_usuario}')

    # Consulta SQL para buscar informações de carros relacionados ao usuário
    query = 'SELECT marca, modelo, cor, placa, foto_url FROM carros_cadastrados WHERE id = %s'
    
    try:
        cursor.execute(query, (id_usuario,))
        rows = cursor.fetchall()

        # Verifica se nenhum carro foi encontrado para o usuário
        if not rows:
            respostaErro = df_ERROR_RespostaFormat_intent_consultarCarros(id_usuario)
            print('Nenhum registro encontrado, retornando erro.')
            return jsonify(respostaErro), 200

        # Prepara a resposta com as informações dos carros cadastrados
        carrosCadastrados = rows
        print('Rows:', rows)
        print('Primeira linha:', rows[0])

        # Aciona a função de resposta para o usuário
        #
        #resposta = df_RespostaFormatada_intent_consultarCarros(carrosCadastrados)
        resposta = df_RespostaFormatada_intent_consultarCarros(carrosCadastrados)

        # Envia a resposta
        return jsonify(resposta), 200

    except mysql.connector.Error as err:
        print(f'Erro na consulta SQL: {err}')
        return jsonify({"error": "Erro SQL interno do servidor."}), 500

    finally:
        cursor.close()
        cnx.close()
