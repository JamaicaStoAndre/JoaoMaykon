const chatbotModal = document.getElementById('chatbotModal');
const closeChatbotBtn = document.getElementById('closeChatbotBtn');

if (closeChatbotBtn) {
    closeChatbotBtn.addEventListener('click', function() {
        chatbotModal.style.display = 'none';
        document.getElementById('openChatbotBtn').style.display = 'block'; // Exibe o botão "Abrir Chatbot" novamente
    });
}

function sendMessage() {
    const chatbotMessages = document.getElementById('chatbotMessages');
    const userMessage = document.getElementById('userMessage').value;

    // Adicionando a mensagem do usuário ao chat
    chatbotMessages.innerHTML += `<div class="user-message">${userMessage}</div>`;

    // Resposta automática para teste
    chatbotMessages.innerHTML += `<div class="bot-message">Olá! Esta é uma resposta automática.</div>`;

    // Limpar o campo de entrada
    document.getElementById('userMessage').value = '';
}
function sendMessageToBackend(userMessage) {
    fetch('http://localhost:5000/webhook', {  // Assumindo que o Flask está rodando na porta padrão 5000
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "queryResult": {
                "queryText": userMessage
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.fulfillmentText;
        // Adicione a resposta do bot ao chatbot
        displayMessage(botResponse, 'bot');  // Supondo que você tenha uma função 'displayMessage' para exibir mensagens no chatbot
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
