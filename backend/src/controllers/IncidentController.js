const conn = require("../database/connection"); //importa arquivo de conexão

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;
        const interval = 5;
        const [total] = await conn('incidents').count();
        
        const incidents = await conn('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //join com tabela ongs
        .limit(interval).offset((page - 1) * interval) //paginação
        .select(["incidents.*", "ongs.name", "ongs.email", "ongs.whatsapp", "ongs.city", "ongs.uf"]);

        response.header('X-Total-Count', total['count(*)']); //total de registros colocado no cabeçalho da resposta
        return response.json( incidents );
    },

    async listByOng(request, response){
        const ong_id = request.headers.authorization;

        const incidents = await conn('incidents').where('ong_id', ong_id).select("*");
        return response.json( incidents );
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await conn('incidents').insert({ //await tem a função de fazer a chamada assíncrona esperar até terminar o insert para continuar
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await conn('incidents').where('id', id).select("ong_id").first();

        if(incident == null || incident.ong_id != ong_id){
            return response.status(401).json({error: "Operação não permitida"});
        }

        await conn('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}