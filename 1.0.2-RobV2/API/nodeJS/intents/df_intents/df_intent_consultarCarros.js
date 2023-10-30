
// Importar a função de log
const { logSqlError, logWarning, logSuccess } = require('../../log/logService')

//Formato de resposta padrão Cartão com Botões - funcionando
const df_Response_ConsultaCarros = require('../../respostas/res_dialogflow/df_resp_inten_consultarCarros/df_res_IntConsCarros_formatCard');

//-=-=-=-=Chama a função de ERRO e reposta.
const df_ERROR_Response_ConsultarCarros = require('../../respostas/res_dialogflow/df_resp_inten_consultarCarros/df_resp_ERROR_IntConsCarros_Card');
//
// Importa a conexão com o banco de dados
const db = require('../../db/mysql/db_schoolGuardiam');

// Função para consultar carros cadastrados
const consultaCarros = (req, res) => {
    // Extrai o ID do usuário a partir do parâmetro enviado pelo Dialogflow
    const id_usuario = req.body.queryResult.parameters.id;
    
    // Consulta SQL para buscar informações de carros relacionados ao usuário
    const query = 'SELECT marca, modelo, cor, placa, foto_url FROM carros_cadastrados WHERE id = ?';
    
    // Executa a consulta SQL
    db.query(query, [id_usuario], (err, rows) => {
        // Verifica se ocorreu um erro na consulta SQL
        if (err) {
            logSqlError('Erro na consulta SQL', err);
            return res.status(500).json({ error: 'Intent: Consutalr carro. Erro SQL interno do servidor.' });
        }

        // Verifica se nenhum carro foi encontrado para o usuário
        if (rows.length === 0) {
            const respostaErro = df_ERROR_Response_ConsultarCarros(id_usuario);
            logWarning('Intent ConsultarCarros: Não localizado a solicitação para o id ' + id_usuario);
            return res.status(200).json(respostaErro);
        }           

        const carrosCadastrados = rows;  
        
        //Aciona a função de resposta para o usuário
        const resposta = df_Response_ConsultaCarros(carrosCadastrados);
        logSuccess('Intent Consultar Carros acionada para o id: ' + id_usuario);

        // Envia a resposta
        return res.status(200).json(resposta);
    });
};

// Exporta a função para ser usada em outros arquivos
module.exports = consultaCarros;