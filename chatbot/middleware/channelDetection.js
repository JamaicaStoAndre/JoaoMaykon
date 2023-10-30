// channelDetection.js

module.exports = function(req) {
    // Aqui você pode implementar a lógica para detectar o canal com base na requisição recebida
    // Neste exemplo simplificado, estamos assumindo que o canal vem em um campo chamado 'platform' dentro do 'req.body'
    
    const platform = req.body.platform || ''; //tenta obter o valor de platform a partir do corpo da requisição (req.body), e se não encontrar, ele define platform como uma string vazia.
  
    // Retorna o canal detectado
    return platform.toLowerCase();
  };
  