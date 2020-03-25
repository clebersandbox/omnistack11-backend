const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;

        const [ count ] = await connection('incidents').count();

        res.header('X-Total-Incidents', count['count(*)']);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.oid_ongs', '=', 'incidents.oid_ongs')
            .limit(5)
            .offset((page-1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
        return res.json(incidents);
    }, 
    async create(req, res) {
        const oid_ongs = req.headers.authorization;
        const { title, description, value } = req.body;

        const [newId] = await connection('incidents').insert({
            title,
            description,
            value,
            oid_ongs
        });

        return res.json({
            oid_incidents : newId
        });
    },

    async delete(req, res) {
        const { oid_indidents } = req.params;
        const oid_ongs = req.headers.authorization;
        
        const incident = await connection('incidents')
            .select('oid_ongs')
            .where('oid_indidents', oid_indidents)
            .first();
        ;

        if (incident.oid_ongs !== oid_ongs)
            return res.status(401).json({
                error: 'Operation not permitted.'
            })
        ;
        
        await connection('incidents').where('oid_indidents', oid_indidents).delete();

        return res.status(204).send();
    }
}