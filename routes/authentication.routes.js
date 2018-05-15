const routes = require('express').Router();
const auth_controller = require('../controllers/authentication.controller');

routes.post('/login', auth_controller.login);
routes.post('/register', auth_controller.register);

module.exports = routes;