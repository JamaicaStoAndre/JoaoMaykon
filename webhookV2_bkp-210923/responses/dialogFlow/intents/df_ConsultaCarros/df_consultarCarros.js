//-=-=-=-=Chama a função de resposta formatada em Card
//const df_Response_ConsultaCarros = require('../../../../utils/dialogFlow/df_Response_Intent_ConsultarCarros/df_res_IntConsCarros_formatCard');
//
//Formato padrão Cartão simples com Título e subtítulo
//const df_Response_ConsultaCarros = require('../../../../utils/dialogFlow/df_exe_resposta_card/df_cartaoSimplesTituloSubTitulo');
//
//Formato padrão Cartão com imagem
//const df_Response_ConsultaCarros = require('../../../../utils/dialogFlow/df_exe_resposta_card/df_cartaoComImagem');
//
//Formato padrão Cartão completo -funcionando
//const df_Response_ConsultaCarros = require('../../../../utils/dialogFlow/df_exe_resposta_card/df_cartaoCompleto');
//
//Formato padrão Cartão com Botões - funcionando
const df_Response_ConsultaCarros = require('../../../../utils/dialogFlow/df_exe_resposta_card/df_cartaoComBotoes');

//-=-=-=-=Chama a função de ERRO e reposta.
const df_ERROR_Response_ConsultarCarros = require('../../../../utils/dialogFlow/df_Response_Intent_ConsultarCarros/df_res_ERROR_IntConsCarros_formatCard.js');
//
// Importa a conexão com o banco de dados
const db = require('../../../../db/db_schoolGuardiam');

// Função para consultar carros cadastrados
const consultaCarros = (req, res) => {
    // Extrai o ID do usuário a partir do parâmetro enviado pelo Dialogflow
    const id_usuario = req.body.queryResult.parameters.id;
    console.log('Id do usuário: ' + id_usuario);

    // Consulta SQL para buscar informações de carros relacionados ao usuário
    //const query = 'SELECT marca, modelo, cor, placa FROM carros_cadastrados WHERE id = ?';
    const query = 'SELECT marca, modelo, cor, placa, foto_url FROM carros_cadastrados WHERE id = ?';
    // Executa a consulta SQL
    db.query(query, [id_usuario], (err, rows) => {
        // Verifica se ocorreu um erro na consulta SQL
        if (err) {
            console.error('Erro na consulta SQL: ' + err);
            return res.status(500).json({ error: 'Erro SQL interno do servidor.' });
        }

        // Verifica se nenhum carro foi encontrado para o usuário
        if (rows.length === 0) {
            const respostaErro = df_ERROR_Response_ConsultarCarros(id_usuario);
            console.log('Nenhum registro encontrado, retornando erro.');
            return res.status(200).json(respostaErro);
        }

        // Prepara a resposta com as informações dos carros cadastrados
        //const carrosCadastrados = rows.map(row => `${row.marca}, ${row.modelo}, ${row.cor}, ${row.placa}`).join('\n');
        //const carrosCadastrados = rows.map(row => `${row.marca}, ${row.modelo}, ${row.cor}, ${row.placa}, ${row.foto_url}`).join('\n');
        //const carrosCadastrados = rows[0];  // Isso deve incluir o campo foto_url
        const carrosCadastrados = rows;  // Isso deve incluir o campo foto_url
        //Teste
        console.log('Rows:', rows);
        console.log('Primeira linha:', rows[0]);
        console.log('URL da foto:', rows[0].foto_url);

        //Aciona a função de resposta para o usuário
        const resposta = df_Response_ConsultaCarros(carrosCadastrados);

        // Envia a resposta
        return res.status(200).json(resposta);
    });
};

// Exporta a função para ser usada em outros arquivos
module.exports = consultaCarros;
