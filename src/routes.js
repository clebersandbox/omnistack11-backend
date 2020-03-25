const express = require('express');
const crypto = require('crypto');

const connection = require('./database/connection');

const router = express.Router();

router.get('/ongs', async (req, res) => {
    const ongs = await connection.table('ongs').select('*');
    return res.json(ongs);
});

/**
 * Body 
 */
router.post('/ongs', async (req, res) => {
    const { name, email, whatsapp, city, uf } = req.body;
    const oidOngs = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        oid_ongs:oidOngs, 
        name, email, whatsapp, city, uf
    });

    return res.json({ oidOngs });
});

module.exports = router;