const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const router = express.Router();

router.post('/sessions', SessionController.create);

router.get('/ongs', OngController.index);
router.post('/ongs', OngController.create);

router.post('/incidents', IncidentController.create);
router.get('/incidents', IncidentController.index);
router.delete('/incidents/:oid_indidents', IncidentController.delete);

router.get('/profile/', ProfileController.index);

module.exports = router;