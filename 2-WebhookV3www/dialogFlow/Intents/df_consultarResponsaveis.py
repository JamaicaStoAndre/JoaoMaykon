from flask import jsonify

def consultar_responsaveis():
    # Aqui você pode adicionar a lógica para consultar responsáveis no banco de dados
    # Por enquanto, apenas retornamos uma mensagem de exemplo
    return jsonify({"fulfillmentText": "Aqui estão os responsáveis cadastrados..."})
