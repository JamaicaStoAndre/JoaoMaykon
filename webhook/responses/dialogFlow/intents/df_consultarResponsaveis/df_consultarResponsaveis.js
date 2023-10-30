//
//-=-=-=   1 Importar o formato de resposta
//
//Formato de Resposta padrão Cartão simples com Título e subtítulo
const df_Response_ConsultaResponsaveis = require('../../df_respostasFormatadas/df_responseIntentConsultarResponsaveis');
//
//-=-=-=-=Chama a função de ERRO e reposta.
const df_ERROR_Response_padraoSimples = require('../../../../responses/dialogFlow/df_respostasFormatadas/df_ERROR_responseIntentConsultarResponsaveis');
//
//-=-=-=-=-=-  2 - Importar a conexão com DB
// Importa a conexão com o banco de dados
const db = require('../../../../db/db_schoolGuardiam');

// -=-=-=-=-3 Função para consultar carros cadastrados
const consultarresponsaveis = (req, res) => {
//-=-=-=-=--=  4 - Capturar dados de parâmetros do DF
const id_usuario = req.body.queryResult.parameters.id;
console.log('Id do usuário: ' + id_usuario);

    //-=-==-=-=-=- 5 - consulta SQL
// Consulta SQL para buscar informações XYZ
const query = 'SELECT usuarios.nome AS nome_usuario_principal, responsaveis.nome AS nome_responsavel, responsaveis.parentesco FROM responsaveis JOIN usuarios ON responsaveis.cpf_usuario = usuarios.CPF WHERE usuarios.id = ?';

//-=-=-=-=-=-=  6  Executa a consulta SQL
db.query(query, [id_usuario], (err, rows) => {
    // Verifica se ocorreu um erro na consulta SQL
    if (err) {
        console.error('Erro na consulta SQL: ' + err);
        return res.status(500).json({ error: 'Erro SQL interno do servidor.' });
    }

    // Verifica se nenhum responsável foi encontrado para o usuário
    if (rows.length === 0) {
        const respostaErro = df_ERROR_Response_padraoSimples(id_usuario);
        console.log('Nenhum registro encontrado, reveja a consulta SQL.');
        return res.status(200).json(respostaErro);
    }

    // Prepara a resposta com as informações dos responsaveis
    const responsaveisCadastrados = rows;
    //Teste
    console.log('Todos registros encontrados:', rows);
    console.log('Primeiro registro encontrado:', rows[0]);
    
    //Aciona a função de resposta para o usuário
    const resposta = df_Response_ConsultaResponsaveis(responsaveisCadastrados);

    // Envia a resposta
    return res.status(200).json(resposta);
});



}














// Por fim exportar módulo para ser utilizado em outros arquivos
module.exports = consultarresponsaveis;
