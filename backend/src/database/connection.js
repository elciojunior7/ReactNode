/*
*
*Arquivo de configuração da conexão
**/
const knex = require('knex');
const config = require("../../knexfile");

//NODE_ENV é uma variavel de ambiente definida em package.json no script test
const environmentDB = process.env.NODE_ENV === "test" ? config.test : config.development;
const conn = knex(environmentDB);

module.exports = conn;