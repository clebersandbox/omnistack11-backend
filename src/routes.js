const express = require('express');

const OngController = require('./controllers/OngController');

const router = express.Router();

router.get('/ongs', OngController.index);
router.post('/ongs', OngController.create);

module.exports = router;