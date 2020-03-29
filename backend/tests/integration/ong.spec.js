const requestSuper = require("supertest"); //usado para fazer requisições às rotas em ambiente de teste
const app = require("../../src/app");
const conn = require("../../src/database/connection");

describe("ONG", () => {
    //beforeEach() executa após o método it()
    beforeEach(async () => {
        await conn.migrate.rollback(); //zera os bancos de dados para não lotar demais e influenciar em outros testes
        //executar migrations para criação das tabelas antes de fazer o teste, senão não haverá tabela e dará erro no teste
        await conn.migrate.latest(); 
    });

    afterAll(async () => { //afterAll() executa após o método it()
        await conn.destroy(); //destrói a conexão senão o teste não chega ao final nunca e lança um warning
    })

    it("should be able to create a new ONG", async () => {
        const response = await requestSuper(app).post("/ongs").send({
            name: "Ajude a Todos",
            //set("Authorization", "idDaOng") //setar algo no header da requisição
            email: "contato.lins@todo.com",
            whatsapp: "14000111222",
            city: "Promissão",
            uf: "SP"
        })

        expect(response.body).toHaveProperty("id");
        expect(response.body.id).toHaveLength(8);
    })
})