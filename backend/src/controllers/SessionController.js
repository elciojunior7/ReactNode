const conn = require("../database/connection"); //importa arquivo de conexão

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const ong = await conn('ongs').where('id', id).select("name").first();

        if(!ong){
            return response.status(400).json({error: "ONG não existe"});
        }

        return response.json({ ong });
    }, 
}