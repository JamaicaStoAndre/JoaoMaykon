// 1 - Vari  veis e requisitos/m  dulos
const express = require('express')
const app = express()
//const https = require('https');
//const fs = require('fs');// --módulo fs para carregar as opções do certificado
const morgan = require('morgan');

var bodyParser = require('body-parser')
// Configurar o m  dulo morgan para gerar logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Outros arquivos necessário
//Conexão com BD mysql
const connection = require('./conexaoDB'); // Importa a conexão com o banco de dados

//2 - Serviços ou rotas
//-----GET-----
//
    //Template
            //app.get('/:XXX', function (req, res){
            //    console.log('Template')
            //    res.send('WEB: Template:')
            //})


//------------POST-----------
//---/depósito: v1-Introdução switch
API_ROBintent_deposito = 0
app.post('/deposito', function(req, res) {
    //1 - Capturar/ Receber dados (post req)
   console.log(req.body)
   action = req.body.queryResult.action
   console.log("=-=-==-=-=-=-=-=");
   console.log("----Intencao acionada:" + action)
   
   //Intencoes
   // 2 - Regra de negócio
   switch (true){
    //----Intenção depósito
    case action == "deposito":
        API_ROBintent_deposito += 1
        //valor = req.body.queryResult.parameters.valor
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
                res.status(400).send('Valor de res.send do Post: Serviço de depósito. ERRO! Valor igual ou menor que 0');
                break;
        }
    }
   //case action == "extrato":
   //---break;   
})
app.listen(3000)