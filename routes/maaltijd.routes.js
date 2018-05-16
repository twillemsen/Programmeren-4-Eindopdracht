const express = require('express');
const routes = express.Router();
const maaltijd_controller = require('../controllers/maaltijd.controller');

routes.post('/studentenhuis/:huisId/maaltijd', maaltijd_controller.createMaaltijd);

module.exports = routes;