const express = require('express');
const routes = express.Router()
const deelnemercontroller = require('../controllers/deelnemer_controller');

routes.post('/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers', deelnemercontroller.createDeelnemer);
routes.get('/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers', deelnemercontroller.getDeelnemers);
routes.delete('/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers', deelnemercontroller.deleteDeelnemer);

module.exports = routes