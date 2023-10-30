document.addEventListener('DOMContentLoaded', function() {
    const openChatbotBtn = document.getElementById('openChatbotBtn');
    const chatbotModal = document.getElementById('chatbotModal');
    const chatbotIframe = document.querySelector('#chatbotModal iframe');
    // Quando o iframe for carregado, defina o foco no campo de entrada
    window.onload = function() {
    const userMessageInput = document.getElementById('userMessage');
    if (userMessageInput) {
        userMessageInput.focus();
    }
};


    // Inicialmente, o botão "Abrir Chatbot" estará oculto
    if (openChatbotBtn) {
        openChatbotBtn.style.display = 'none';
    }

    // Exibir o botão "Abrir Chatbot" após 3 segundos
    setTimeout(function() {
        if (openChatbotBtn) {
            openChatbotBtn.style.display = 'block';
        }
    }, 3000);

    // Adicionar evento de clique para o botão "Abrir Chatbot"
    if (openChatbotBtn) {
        openChatbotBtn.addEventListener('click', function() {
            if (chatbotModal) {
                chatbotModal.style.display = 'block';
                openChatbotBtn.style.display = 'none'; // Oculta o botão "Abrir Chatbot"
                
            }
        });
    }
});
