// 1 - Vari  veis e requisitos/m  dulos
const express = require('express')
const app = express()
//const https = require('https');
//const fs = require('fs');// --módulo fs para carregar as opções do certificado
const morgan = require('morgan');
const buildResponseMessage = require('./respostasDialogFlow'); // Importar a função para construção de respostas para o dialogFlow

var bodyParser = require('body-parser')
// Configurar o m  dulo morgan para gerar logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Outros arquivos necessário
//Conexão com BD mysql
const conexaoDB = require('./conexaoDB');

//2 - Serviços ou rotas
//-----GET-----
//
    //Template
            //app.get('/:XXX', function (req, res){
            //    console.log('Template')
            //    res.send('WEB: Template:')
            //})
//
// Variáveis de intenções
//
API_ROBintent_deposito = 0
API_ROBintent_consultar_usuarios = 0
//
//------------POST-----------
//-------API:depósito: v1-Introdução switch

app.post('/deposito', async function(req, res) {
    //1 - Capturar/ Receber dados (post req)
   //console.log(req.body)//exibe log de todo req
   action = req.body.queryResult.action
   console.log("=-=-==-=-=-=-=-=");
   console.log("----Intencao acionada:" + action)
   
    //Intencoes
    //-----------2 - Regras de negócio-------
  switch (true){//-----Switch principal deposito
    //
    //----Intenção depósito
    case action == "deposito":
        API_ROBintent_deposito += 1
        valor = req.body.queryResult.parameters.valor
        console.log("=-=-==-=-=-=-=-=");
        console.log("Console: variável valor: "+ valor);
        console.log("=-=-==-=-=-=-=-=");
        console.log("Console: Qtdade de vezes que foi acionada: " + API_ROBintent_deposito);
           
        // Intent.deposito regra <valor>
        switch (true) {
            case valor > 0:
                valor_ajustado = valor + 0.5;
        
                //--3 - Resposta do Webhook. Response
                // Envia uma resposta de sucesso
                console.log("=-=-==-=-=-=-=-=");
                console.log('Console: Post.Res.send: Serviço de depósito. Valor: ' + valor_ajustado);
                console.log("=-=-==-=-=-=-=-=");
                response = {
                    "fulfillmentMessages": [
                      {
                        "text": {
                          "text": [
                            "Valor de res.send do Post: Serviço de depósito tem o valor da variável valor: " + valor_ajustado
                          ]
                        }
                      }
                    ]
                  }
                //res.status(200).send('Valor de res.send do Post: Serviço de depósito tem o valor da variável valor: ' + valor_ajustado);
                res.status(200).send(response);
                break;
        
            default:
                // Envia uma resposta de ERRO!
                console.log("=-=-==-=-=-=-=-=");
                console.log('Res.send: Post: Serviço de depósito. ERRO! Valor incompatível');
                console.log("=-=-==-=-=-=-=-=");
    //--3 - Resposta do Webhook
                res.status(200).send('Valor de res.send do Post: Serviço de depósito. ERRO! Valor igual ou menor que 0');
                break;
        }
        //Fim intent deposito
        //*============================================//
       //----------Intent consutar usuários BD Mysql
       //*============================================//
    case action == "consutar_usuarios":
        API_ROBintent_consultar_usuarios += 1
        console.log("=-=-==-=-=-=-=-=");
        console.log("Console: Intenção consultar usuários acionada, "+ API_ROBintent_consultar_usuarios + " vezes. ");
        console.log("=-=-==-=-=-=-=-=");
        /// Consultar dados na tabela usuarios_cadastro
        //Inicia regra Codigo
        // Consultar dados na tabela usuarios_cadastro
          const consultaUsuariosQuery = `
          SELECT nome, email, telefone
          FROM usuarios_cadastro;
          `;

          const result = await conexaoDB.query(consultaUsuariosQuery);

            if (result && Array.isArray(result)) {
                const usuarios = result.map(row => `Nome: ${row.nome}, Email: ${row.email}, Telefone: ${row.telefone}`);
                const message = `Usuários cadastrados: ${usuarios.join(', ')}`;
                response = buildResponseMessage(message);
                res.status(200).json(response);
            } else {
                console.error('Resultado da consulta não é um array:', result);
                const errorMessage = "Erro ao consultar dados do usuário.";
                response = buildResponseMessage(errorMessage);
                res.status(500).json(response);
            }
                    


        //fecha regra codigo
        break;
        
    break;
    }//Fim Switch principal
})//fim API:deposito-v1-Introdução switch
app.listen(3000)