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
    connection.query('SELECT * FROM `Usuários` ORDER BY `Nome` ASC', function(queryErr, results) {
      const endTime = new Date();
      const tempoDecorrido = endTime - startTime; // Calcula o tempo decorrido em milissegundos

      if (queryErr) {
        console.error('Erro ao executar a consulta:', queryErr);
      } else {
        console.log('Consulta realizada com sucesso!');
        console.log(`Velocidade da consulta: ${tempoDecorrido} ms`);
        console.log('Resultado da consulta:', results);
      }

      // Fecha a conexão após a consulta
      connection.end();
    });
  };

  // Chama a função para calcular a velocidade da consulta
  calcularVelocidadeConsulta();
});