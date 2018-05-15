const routes = require('express').Router();
const auth_controller = require('../controllers/authentication.controller');
let ApiError = require('../model/ApiError');

routes.post('/login', auth_controller.login);
routes.post('/register', auth_controller.register);

// Wrong route inputs:
routes.get('/register', (req, res, next) => {
    res.status(404).send(new ApiError('GET request kan niet op /api/register uitgevoerd worden', 404));
});

module.exports = routes;