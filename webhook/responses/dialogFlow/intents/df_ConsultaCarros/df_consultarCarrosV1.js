// Importa a conexão com o banco de dados e a função de formatação
const db = require('../../../../db/db_schoolGuardiam');

//Carrega o formato de resposta do DF Nr2
const df_Response_ConsultaCarros = require('../../../../utils/dialogFlow/df_Response_Intent_ConsultarCarros/df_res_IntConsCarros_formatCard');

//----Resposta de ERRO N2 DF-----
const df_ERROR_Response_ConsultarCarros = require('../../../../utils/dialogFlow/df_Response_Intent_ConsultarCarros/df_res_ERROR_IntConsCarros_formatCard');


// Função para Consultar carros cadastrados
const consultaCarros = (req, res) => {
    //
    // 1 - Extrai da intenção os parâmetros da consulta
    const cpf_usuario = req.body.queryResult.parameters.cpf

    // 2 Consulta SQL 
    const query = 'SELECT * FROM carros_cadastrados WHERE cpf_usuario =  ?';

    // 3  Executa a consulta ao banco de dados
    db.query(query, [cpf_usuario], (err, rows) => {
    // Verifica se ocorreu um erro na consulta
        if (err) {
            console.error('Erro na consulta SQL: ' + err);
            console.log('Consultar carros cadastrados: Erro na consulta SQL: ' + err);
            // Retorna um erro 500 (Erro Interno do Servidor) se houver um problema na consulta
            return res.status(500).json({ error: 'df_consultarCarros.js: Resposta para o solicitante da API: Erro SQL interno do servidor.' });
        }
        // Verifica se algum registro foi retornado
        if (rows.length === 0) {
            // Se nenhum registro foi encontrado, retorna um erro 404 (Não Encontrado), mas utilizando 200 para dialogflow receber a msg
            const respostaErro = df_ERROR_Response_ConsultarCarros(cpf_usuario);
            console.log('df_fetchProduct: Nenhum registro encontrado, retornando erro.');
            return res.status(200).json(respostaErro);
        }
        // Obtém o nome do produto a partir do resultado da consulta
            const carrosCadastrados = rows[0].nome;
            
            // Usa a função de formatação para criar a resposta
            const resposta = df_Response_ConsultaCarros(carrosCadastrados);
            
            // Envia a resposta formatada com status 200 (OK)
            res.status(200).json(resposta);
        });



    console.log("CPF recebido pela função Consultar carros:" + cpf_usuario);
    resposta = df_ERROR_Response_ConsultarCarros(cpf_usuario)
    return res.status(200).json(resposta)
}

// Exporta a função para ser usada em outros arquivos
module.exports = consultaCarros;