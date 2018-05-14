const express = require ('express')
const routes = express.Router()
const studentenhuiscontroller = require('../controllers/studentenhuis_controller');

routes.post('/studentenhuis', studentenhuiscontroller.createStudentenhuis);

module.exports = routes