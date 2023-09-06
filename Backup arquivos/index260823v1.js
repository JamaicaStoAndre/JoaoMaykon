//Outros arquivos necessário
//Conexão com BD mysql
const connection = require('./conexaoDB'); // Importa a conexão com o banco de dados

// 1 - Variáveis e requisitos/módulos
const express = require('express')
const app = express()
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//2 - Serviços ou rotas
            //Template
            //app.get('/:XXX', function (req, res){
            //    console.log('Template')
            //    res.send('WEB: Template:')
            //})


app.get('/', function (req, res){
    console.log('Console: Testando rotas!')
    res.send('WEB: Teestando rotas!')
})

app.get('/oi', function (req, res){
    console.log('Conselo: função /oi')
    res.send('Web: Serviço OI')
})


app.get('/pegar_nome/:nome', function (req, res){
    console.log('Conselo: função Pegar nome')
    //console.log(req)
    nome = req.params.nome //Dentro de req. a diretiva params[] ficam armazenados os parâmetros
    res.send('WEB: Serviço pegar nome! Nome pego: ' + nome)
})
// Método Get com Query (passar dados no navegador, conforme imagem)
//---------------Exemplo: http://localhost:3000/pegar_dados?nome=maykon&idade=43
//
app.get('/pegar_dados', function (req, res){ 
    console.log('Terminal: Essa é a resposta da query: ' + req.query.nome)
    nome = req.query.nome
    idade = req.query.idade
    res.send('WEB: Qurery com dados de usuários: Nome: ' + nome + ', Idade: ' + idade)
    //res.send('WEB: dados de usuários:' + nome )
})

//------------Post-----------
app.post('/deposito', function (req, res){
    //1 - Capturar/receber dados - Request
    console.log(req.body)
    valor = req.body.valor

    //2 - Regras de negócio
    if (valor > 0 ) {
        valor_ajustado = valor + 0.5

         //3 - Response    
        console.log('Res.send: Post: Servi  o de deposito. Valor: ' + valor_ajustado)
        res.send('Valor de res.send do Post: Servi  o de dep  sito tem o valor da variavel valor: ' + valor_ajustado)
    } else {
        //3 - Response    
        console.log('Res.send: Post: Servi  o de deposito. ERRO! Valor incompatível')
        res.send('Valor de res.send do Post: Servi  o de dep  sito. ERRO! Valor igua ou menor que 0')
    }
})

app.post('/inovabot', function(req, res) {
    //1 - Capturar/ Receber dados (post req)
   console.log(req.body)
   action = req.body.queryResult.action
    
    console.log(action)
   // 2 - Regra de negócio
   if (action == "deposito") {
        valor = req.body.queryResult.parameters.valor
        console.log(valor)
       
        if (valor > 0 ) {
            valor_ajustado = valor + 0.5
    
             //3 - Response    
            response = {
                "fulfillmentText" : "Conseguimos receber seu depósito. Demos um brinde a você e ficou: " + valor_ajustado,
                "fulfillmentMessages": [
                  {
                    "text": {
                      "text": [
                        "Conseguimos receber seu depósito. Demos um brinde a você e ficou: " + valor_ajustado
                      ]
                    }
                  }
                ]
              }
            console.log('Webhook inovabot ativado. Valor: ' + valor_ajustado)
            res.status(200).send(response)
        } else {
            //3 - Response    
            console.log('Res.send: Post: Servi  o de deposito. ERRO! Valor incompatível')
            response = {
                "fulfillmentText" : "Infelizmente não conseguimos realizar seu depóstito, tente outro valor!",
                "fulfillmentMessages": [
                  {
                    "text": {
                      "text": [
                        "Infelizmente não conseguimos realizar seu depóstito, tente outro valor!"
                      ]
                    }
                  }
                ]
              }
           res.status(200).send(response)
        }
   } //else if (action == "extrato"){}...
})
app.post('/rob', function(req, res) {
  //1 - Capturar/ Receber dados (post req)
 console.log(req.body)
 action = req.body.queryResult.action  
 console.log(action)
 //
 // 2 - Regra de negócio: Consultar usuários
 intent_Consultar_usuario = 0
 if (action == "consultar_usuarios_BD") {
      user_BD = req.body.queryResult.action
      intent_Consultar_usuario += 1
      console.log('Inteção Consultar usuários foi acionada: ' + intent_Consultar_usuario + ' vezes.')
      console.log(user_BD)
     
      if (user_BD  == "consultar_usuarios_BD" ) {
        const connection = require('./conexaoDB'); // Importa a conexão com o banco de dados
          // Tentativa de conexão
          connection.connect(function(err) {
            if (err) {
              console.error('Erro ao conectar ao banco de dados:', err);
              return;
            }

            // Função para calcular a velocidade da consulta
            const calcularVelocidadeConsulta = () => {
              const startTime = new Date();

              // Realiza a consulta no banco de dados
              connection.query('SELECT * FROM `Usuários` ORDER BY `Nome` ASC', function(queryErr, resultadoConsultaUsuarios) {
                const endTime = new Date();
                const tempoDecorrido = endTime - startTime; // Calcula o tempo decorrido em milissegundos

                if (queryErr) {
                  console.error('Erro ao executar a consulta:', queryErr);
                } else {
                  console.log('Consulta realizada com sucesso!');
                  console.log(`Velocidade da consulta: ${tempoDecorrido} ms`);
                  console.log('Resultado da consulta:', resultadoConsultaUsuarios);
                }

                // Fecha a conexão após a consulta
                connection.end();
              });
            };

            // Chama a função para calcular a velocidade da consulta
            calcularVelocidadeConsulta();
          });
          
           //3 - Response    
          response = {
              "fulfillmentText" : "Segue a lista dos usuários: " + resultadoConsultaUsuarios,
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                      "Segue a lista dos usuários: " + resultadoConsultaUsuarios
                    ]
                  }
                }
              ]
            }
          console.log('Webhook inovabot. Função consulta usuários BD. Valor: ' + resultadoConsultaUsuarios)
          res.status(200).send(response)
      } else {
          //3 - Response    
          console.log('Console. Res.send: Post: Servidor Node. ERRO! Deu ruim')
          response = {
              "fulfillmentText" : "Infelizmente não conseguimos realizar sua consulta. Fulfillment. Post: Servidor Node. ERRO! Deu ruim",
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                      "Infelizmente não conseguimos realizar sua consulta. Fulfillment. Post: Servidor Node. ERRO! Deu ruim"
                    ]
                  }
                }
              ]
            }
         res.status(200).send(response)
      }
 } //else if (action == "extrato"){}...
})
app.listen(3000)