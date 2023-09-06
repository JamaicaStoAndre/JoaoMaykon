// Carrega o arquivo JSON
fetch('arquivo.json')
    .then(response => response.json())
    .then(data => {
        const jsonKeysContainer = document.getElementById('jsonKeys');
        
        // Itera sobre as chaves do JSON e cria elementos para exibição
        for (const key in data) {
            const keyElement = document.createElement('div');
            keyElement.className = 'col-md-4';
            keyElement.innerHTML = `<strong>${key}</strong>`;
            jsonKeysContainer.appendChild(keyElement);
        }
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
