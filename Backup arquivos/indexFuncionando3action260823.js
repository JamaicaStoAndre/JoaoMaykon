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

// Variáveis de intenções
//
API_ROBintent_deposito = 0
API_ROBintent_consultar_usuarios = 0
API_ROBintent_extrato = 0

//
//------------POST-----------
//-------API:depósito: v1-Introdução switch

app.post('/deposito', function(req, res) {
  //1 - Capturar/ Receber dados (post req)
  //
  //console.log(req.body)
  action = req.body.queryResult.action
  console.log("-=-=-=-=-==-=-=-=-=-=");
  console.log("----Intencao acionada:" + action)
  //-----------Intencoes------
  //-----------2 - Regras de negócio-------
  switch (true) {
    //----inicio Intent deposito ----
    case action == "deposito":
      API_ROBintent_deposito += 1;
      console.log("-=-=-=-=-==-=-=-=-=-=");
      console.log("Console: Intent deposito acionada. " + API_ROBintent_deposito + " vezes.")
      valor = req.body.queryResult.parameters.valor
          //regras da variável valor
          console.log("Valor repassado do cliente: " + valor);
          if (valor > 0) {
            console.log("Entrei na opção valor maior que zero.");
            console.log("-=-=-=-=-==-=-=-=-=-=");
            valor_ajustado = valor*1.05
            console.log("Valor ajustado: " + valor_ajustado);
            console.log("-=-=-=-=-==-=-=-=-=-=");
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
            res.status(200).send(response);// resposta ao cliente
          }else{
            console.log("Valor menor que zero");
            res.status(200).send("Resposta ao cliente. ERRO! O valor: " + valor + " não é válido.");// resposta ao cliente
          }      
    break;//---Fim deposito---
      //
      //---Inicio Consultar usuarios
    case action == "consulta":
      API_ROBintent_consultar_usuarios += 1;
      console.log("-=-=-=-=-==-=-=-=-=-=");
      console.log("Console: Intent consultar usuários acionada. " + API_ROBintent_consultar_usuarios + " vezes.");
      res.status(200).send("Resposta ao cliente. Intend Consultar usuários acionada")
    break;
      //----FIM consulta usuários
      //
      //---Inicio extrato
    case action == "extrato":
      API_ROBintent_extrato += 1;
      console.log("-=-=-=-=-==-=-=-=-=-=");
      console.log("Console: Intent extrato acionada. " + API_ROBintent_extrato + " vezes.");
      res.status(200).send("Resposta ao cliente. Intend Extrato acionada")
    break;
      //----FIM Intent extrato
      //
  default:
    console.log("-=-=-=-=-==-=-=-=-=-=");
    console.log("Não conseguigos");
  }
  //-----------2 - Regras de negócio-------
  //-----------3 - Resposta para cliente- RES-------
  
})//fim API:deposito-v1-Introdução switch
app.listen(3000)