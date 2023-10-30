function df_Response_ConsultaResponsaveis(responsaveisCadastrados) {
    // Vamos começar criando a mensagem inicial, dizendo qual é o usuário principal.
    let respostaText = `Os responsáveis pelo usuário ${responsaveisCadastrados[0].nome_usuario_principal} são:\n\n`;

    // Agora, para cada responsável que encontramos, vamos adicionar seu nome e parentesco na nossa mensagem.
    responsaveisCadastrados.forEach(responsavel => {
        respostaText += `- Nome: ${responsavel.nome_responsavel}, Parentesco: ${responsavel.parentesco}\n`;
    });

    // Finalmente, vamos criar a resposta completa e enviá-la de volta.
    return {
        fulfillmentText: respostaText
    };
}

module.exports = df_Response_ConsultaResponsaveis;
