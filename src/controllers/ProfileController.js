const connection = require('../database/connection');

module.exports = {
    async index (req, res) {
        const oid_ongs = req.headers.authorization;

        const incidents = await connection('incidents')
            .where('oid_ongs', oid_ongs)
            .select('*');

        return res.json(incidents);
    }
}