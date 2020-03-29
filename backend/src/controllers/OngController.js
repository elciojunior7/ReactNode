const conn = require("../database/connection"); //importa arquivo de conexão
const generateUniqueId = require("../util/generateUniqueId"); //módulo de criptografia usado para gerar o ID da ONG

module.exports = {
    async index(request, response){
        const ongs = await conn('ongs').select('*');
        return response.json( ongs );
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;
        const id = generateUniqueId();

        await conn('ongs').insert({ //await tem a função de fazer a chamada assíncrona esperar até terminar o insert para continuar
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ id });
    }
}