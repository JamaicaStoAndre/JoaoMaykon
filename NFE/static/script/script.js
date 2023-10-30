const scanBarcodeButton = document.getElementById('scanBarcode');
const resultDiv = document.getElementById('result');
import { init, start, onDetected, stop } from 'quagga';


// Evento para ler código de barras usando a câmera
scanBarcodeButton.addEventListener('click', () => {
    // Configuração do QuaggaJS
    init({
        inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('#preview'), // Div para visualização da câmera
            constraints: {
                width: 640,
                height: 480,
                facingMode: 'environment', // Use a câmera traseira (se disponível)
            },
        },
        decoder: {
            readers: ['ean_reader', 'upc_reader', 'code_128_reader', 'qr_code_reader'], // Tipos de códigos suportados
        },
    }, function (err) {
        if (err) {
            console.error('Erro ao inicializar QuaggaJS:', err);
            return;
        }
        start();

        // Evento para lidar com a leitura bem-sucedida
        onDetected(function (result) {
            const code = result.codeResult.code;
            resultDiv.textContent = "Código de Barras: " + code;

            // Pare o Quagga após a leitura bem-sucedida
            stop();
        });
    });
});
