const express = require('express');
const routes = express.Router();
const maaltijd_controller = require('../controllers/maaltijd_controller');

routes.post('/studentenhuis/:id/maaltijd', maaltijd_controller.createMaaltijd);
routes.get('/studentenhuis/:id/maaltijd', maaltijd_controller.getMaaltijden);
routes.get('/studentenhuis/:id/maaltijd/:maaltijdId', maaltijd_controller.getMaaltijdById);
routes.put('/studentenhuis/:id/maaltijd/:maaltijdId', maaltijd_controller.updateMaaltijd);
routes.delete('/studentenhuis/:id/maaltijd/:maaltijdId', maaltijd_controller.deleteMaaltijd);

module.exports = routes;