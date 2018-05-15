const express = require ('express')
const routes = express.Router()
const studentenhuiscontroller = require('../controllers/studentenhuis_controller');

routes.post('/studentenhuis', studentenhuiscontroller.createStudentenhuis);
routes.get('/studentenhuis', studentenhuiscontroller.getStudentenhuizen);
routes.get('/studentenhuis/:id', studentenhuiscontroller.getStudentenhuisById);
routes.put('/studentenhuis/:id', studentenhuiscontroller.updateStudentenhuis);

module.exports = routes