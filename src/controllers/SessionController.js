const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { oid_ongs } = req.body;

        const ong = await connection('ongs')
            .where('oid_ongs', oid_ongs)
            .select('name')
            .first()
        ;

        if (!ong) {
            return res.status(400).json({
                error : 'No ONG found with this OID'
            })
        }

        return res.json(ong);

    }
}