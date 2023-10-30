from flask import Flask, request, jsonify
from dialogFlow.Intents import df_consultarCarros, df_consultarResponsaveis, df_consultarProdutos, df_consutarPAP51
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Contadores para rastrear quantas vezes cada intenção é acionada
df_QtdaVezesConsultarCarros = 0
df_QtdaVezesConsultarResponsaveis = 0
df_QtdaVezesConsultarProdutos = 0
df_QtdaVezesBaixarVtr = 0

@app.route('/webhook', methods=['POST'])
def webhook():
    global df_QtdaVezesConsultarCarros, df_QtdaVezesConsultarResponsaveis, df_QtdaVezesConsultarProdutos

    # Tenta extrair a intenção da requisição
    try:
        diagloflow = jsonify(request.json)
        intent_name = request.json["queryResult"]["intent"]["displayName"]
        print('~'*30)
        print(f'Nome da intenção acionada: {intent_name}')
        print('~'*30)
        #print('~'*30)
        #print('Corpo do Json do dialogFlow:')
        #print(diagloflow)
        #print('~'*30)
    except KeyError:
        return jsonify({"fulfillmentText": "Desculpe, não consegui entender sua solicitação."}), 400

    match intent_name:
        case "2-#ConsultarCarrosCadastrados":
            df_QtdaVezesConsultarCarros += 1
            print(f'Intenção {intent_name} acionada {df_QtdaVezesConsultarCarros} vez(es).')
            return df_consultarCarros.consultar_carros()
        case "3#Consultar_resonsaveis":
            df_QtdaVezesConsultarResponsaveis += 1
            return df_consultarResponsaveis.consultar_responsaveis()
        case "buscar_produto":
            df_QtdaVezesConsultarProdutos += 1
            return df_consultarProdutos.consultar_produtos()
        case "baixar_viatura":
            #df_QtdaVezesBaixarVtr += 1
            print(f'Acionando Função: Baixar Viatura- Consultar PAP')
            perguntaUsuario = request.json["queryResult"]["queryText"]
            print('~'*30)
            print(f'Pergunta do usuário: {perguntaUsuario} ')
            print('~'*30)
            return df_consutarPAP51.consulta_documento(perguntaUsuario)
        case _:
            return jsonify({"fulfillmentText": "Desculpe, essa intenção não é reconhecida."}), 200

if __name__ == "__main__":
    app.run(debug=True)
