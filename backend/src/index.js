const express = require("express"); //importar o módulo express
const routes = require("./routes"); //uso ./ paradeixar claro que se trata de um arquivo, sem isso ele tentaria importar um módulo
const cors = require('cors');

const app = express(); //instanciar aplicação

app.use(cors()); //Isso já permite o acesso de qualquer frontend à API em DEV
app.use(express.json());
app.use(routes);


app.listen(3333); //API está ouvindo nesta porta