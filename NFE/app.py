from flask import Flask, render_template, request, jsonify
from pyzbar.pyzbar import decode
from PIL import Image

app = Flask(__name__)

# Configuração para servir arquivos estáticos
app.static_url_path = '/static'
app.static_folder = 'static'


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload-xml', methods=['POST'])
def upload_xml():
    if 'xmlFile' not in request.files:
        return jsonify({'error': 'No XML file provided'}), 400

    xml_file = request.files['xmlFile']

    if xml_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Aqui você pode implementar a lógica para processar o arquivo XML da NFe.
    # Exemplo: Extrair dados relevantes e retornar como JSON.

    return jsonify({'data': 'Dados da NFe processados com sucesso'})

if __name__ == '__main__':
    app.run(debug=True)
