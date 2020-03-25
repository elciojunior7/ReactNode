const express = require("express"); //importar o módulo express

const app = express(); //instanciar aplicação

app.use(express.json());

app.get("/", (request, response) => {  
    //return response.send("Hello wwWorld"); //imprime Hello World na tela
    return response.json({                //Json devolvido conforme API REST
        evento: "Semana OmniStack",
        aluno: "Elcio Jr"
    });
});

app.listen(3333); //API está ouvindo nesta porta