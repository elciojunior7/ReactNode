const express = require("express"); //importar o módulo express
const routes = require("./routes"); //uso ./ paradeixar claro que se trata de um arquivo, sem isso ele tentaria importar um módulo
const cors = require('cors');
const { errors } = require("celebrate");

const app = express(); //instanciar aplicação

app.use(cors()); //Isso já permite o acesso de qualquer frontend à API em DEV
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;