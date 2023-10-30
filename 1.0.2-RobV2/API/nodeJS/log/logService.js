// Importando o pacote winston para gerenciamento de logs.
const winston = require('winston');

// Define o formato padrão dos logs.
const logFormat = winston.format.combine(
    // Adiciona um carimbo de data/hora em cada log.
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Formata a saída do log.
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`
    )
);

// Cria o logger principal com transportes definidos.
const logger = winston.createLogger({
    format: logFormat,
    transports: [
        // Log de erros relacionados à intenções não encontradas.
        // Filtro para registrar apenas mensagens que contêm "Intent Not Found".
        new winston.transports.File({
            filename: 'log/log_dialogflow/df_ERROR_Intent_NLocalizada.log',
            level: 'error',
            format: winston.format.combine(
                winston.format((info) => {
                    if (info.message.includes('Intent Not Found')) return info;
                    return false;
                })(),
                logFormat
            )
        }),
        // Log de erros relacionados ao SQL.
        // Filtro para registrar apenas mensagens que contêm "SQL Error".
        new winston.transports.File({
            filename: 'log/log_dialogflow/df_ERROR_SERVER_SQL.log',
            level: 'error',
            format: winston.format.combine(
                winston.format((info) => {
                    if (info.message.includes('SQL Error')) return info;
                    return false;
                })(),
                logFormat
            )
        }),
        // Log de avisos.
        // Filtro para excluir mensagens de erros SQL, intenções não encontradas e sucessos.
        new winston.transports.File({
            filename: 'log/log_dialogflow/df_WARN_consultaNaolocalizada.log',
            level: 'warn',
            format: winston.format.combine(
                winston.format((info) => {
                    if (!info.message.includes('SQL Error') && !info.message.includes('Intent Not Found') && !info.message.includes('Intent Consultar Carros acionada')) return info;
                    return false;
                })(),
                logFormat
            )
        }),
        // Log de sucesso relacionado à intenção "Consultar Carros".
        // Filtro para registrar apenas mensagens de sucesso da intent.
        new winston.transports.File({
            filename: 'log/log_dialogflow/df_Intent_consultarCarros.log',
            level: 'info',
            format: winston.format.combine(
                winston.format((info) => {
                    if (info.message.includes('Intent Consultar Carros acionada')) return info;
                    return false;
                })(),
                logFormat
            )
        }),
        // Log geral que captura todos os logs.
        new winston.transports.File({
            filename: 'log/logGeral.log',
            level: 'info'
        })
    ]
});

// Caso não esteja em produção, também exibe os logs no console.
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// Funções de log para diferentes cenários.
function logIntentNotFound(message) {
    logger.error(`Intent Not Found: ${message}`);
}

function logSqlError(message, additionalInfo) {
    logger.error(`SQL Error: ${message}` + (additionalInfo ? ` - ${additionalInfo}` : ''));
}

function logWarning(message, additionalInfo) {
    logger.warn(message + (additionalInfo ? ` - ${additionalInfo}` : ''));
}

function logSuccess(message, additionalInfo) {
    logger.info(message + (additionalInfo ? ` - ${additionalInfo}` : ''));
}

// Exporta as funções de log para serem usadas em outros módulos.
module.exports = {
    logIntentNotFound,
    logSqlError,
    logWarning,
    logSuccess
};
