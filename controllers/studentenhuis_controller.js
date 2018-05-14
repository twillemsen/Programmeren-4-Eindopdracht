const Studentenhuis = require ('../model/Studentenhuis')
const assert = require('assert')

let huislist = [];

module.exports = {
    createStudentenhuis(req, res, next){
        console.log('studentenhuiscontroller.createStudentenhuis');
        assert(req.body.name, 'A name must be provided');
        assert(req.body.address, 'An address must be provided');

        const name = req.body.name;
        const address = req.body.address;
        console.log('We got' + name + ' ' + address);

        let huis = new Studentenhuis(name, address);
        huislist.push(huis);

        res.status(200).json(huis).end();

    }
}