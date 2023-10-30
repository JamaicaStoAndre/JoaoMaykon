from flask import jsonify

def consultar_produtos():
    # Aqui você pode adicionar a lógica para consultar produtos no banco de dados
    # Por enquanto, apenas retornamos uma mensagem de exemplo
    return jsonify({"fulfillmentText": "Aqui estão os produtos cadastrados..."})
