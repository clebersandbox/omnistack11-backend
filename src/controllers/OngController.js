const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (req, res) {
        const ongs = await connection.table('ongs').select('*');
        return res.json(ongs);
    },
    async create( req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
        const oidOngs = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            oid_ongs:oidOngs, 
            name, email, whatsapp, city, uf
        });

        return res.json({ oidOngs });
    }
    
}