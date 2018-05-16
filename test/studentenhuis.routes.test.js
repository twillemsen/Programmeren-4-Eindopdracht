const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Studentenhuis API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post('/api/studentenhuis')
            .set('x-access-token', 'onzinToken')
            .send({
                "naam": "ABCD",
                "adres": "EFG1"
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('message').equals('No token or wrong token provided');
                response.should.have.property('code').equals(401);
                response.should.have.property('datetime').equals(res.body.datetime);

                done();
            });
    });

    it('should return a studentenhuis when posting a valid object', (done) => {
        const validToken = require('./authentication.routes.test').token;

        chai.request(server)
            .post('/api/studentenhuis')
            .set('x-access-token', validToken)
            .send({
                "naam": "ABCD",
                "adres": "EFGHI1"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('ID');
                response.should.have.property('Naam').equals(res.body.Naam);
                response.should.have.property('Adres').equals(res.body.Adres);
                response.should.have.property('Contact').equals(res.body.Contact);
                response.should.have.property('Email').equals(res.body.Email);

                done();
            });
    });

    it('should throw an error when naam is missing', (done) => {
        const validToken = require('./authentication.routes.test').token;

        chai.request(server)
            .post('/api/studentenhuis')
            .set('x-access-token', validToken)
            .send({
                "adres": "EFGHI1"
            })
            .end((err, res) => {
                res.should.have.status(412);
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('message').equals('A name must be provided');
                response.should.have.property('code').equals(412);
                response.should.have.property('datetime').equals(res.body.datetime);

                done();
            });
    });

    it('should throw an error when adres is missing', (done) => {
        const validToken = require('./authentication.routes.test').token;

        chai.request(server)
            .post('/api/studentenhuis')
            .set('x-access-token', validToken)
            .send({
                "naam": "ABCD"
            })
            .end((err, res) => {
                res.should.have.status(412);
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('message').equals('An address must be provided');
                response.should.have.property('code').equals(412);
                response.should.have.property('datetime').equals(res.body.datetime);

                done();
            });
    });
});

describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get('/api/studentenhuis')
            .set('x-access-token', 'onzinToken')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('message').equals('No token or wrong token provided');
                response.should.have.property('code').equals(401);
                response.should.have.property('datetime').equals(res.body.datetime);

                done();
            });
    });

    it('should return all studentenhuizen when using a valid token', (done) => {
        const validToken = require('./authentication.routes.test').token;

        chai.request(server)
            .get('/api/studentenhuis')
            .set('x-access-token', validToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');

                let response = res.body;

                // response.should.have.property('ID').deep.equals(res.body.ID);
                // response.should.have.property('Naam').deep.equals(res.body.Naam);
                // response.should.have.property('Adres').deep.equals(res.body.Adres);
                // response.should.have.property('UserID').deep.equals(res.body.UserID);

                // response.should.have.all.deep.keys('ID', 'Naam', 'Adres', 'UserID');


                // DEZE TESTCASE KLOPT NOG NIET HELEMAAL 
                done();
            });
    });
});

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get('/api/studentenhuis/2')
            .set('x-access-token', 'onzinToken')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('message').equals('No token or wrong token provided');
                response.should.have.property('code').equals(401);
                response.should.have.property('datetime').equals(res.body.datetime);

                done();
            });
    });

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        const validToken = require('./authentication.routes.test').token;

        chai.request(server)
            .get('/api/studentenhuis/2')
            .set('x-access-token', validToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('ID').equals(res.body.ID);
                response.should.have.property('Naam').equals(res.body.Naam);
                response.should.have.property('Adres').equals(res.body.Adres);
                response.should.have.property('UserID').equals(res.body.UserID);

                done();
            }); 
    });

    it('should return an error when using an non-existing huisId', (done) => {
        const validToken = require('./authentication.routes.test').token;

        chai.request(server)
            .get('/api/studentenhuis/1429419581958920385985390285032')
            .set('x-access-token', validToken)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('message').equals('Niet gevonden (Huis ID bestaat niet)');
                response.should.have.property('code').equals(404);
                response.should.have.property('datetime').equals(res.body.datetime);

                done();
            }); 
    });
});

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .put('/api/studentenhuis/2')
            .set('x-access-token', 'onzinToken')
            .send({
                "naam": "NieuweNaam",
                "adres": "NieuwAdres"
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('message').equals('No token or wrong token provided');
                response.should.have.property('code').equals(401);
                response.should.have.property('datetime').equals(res.body.datetime);

                done();
            });
    });

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when naam is missing', (done) => {
        const validToken = require('./authentication.routes.test').token;

        chai.request(server)
            .put('/api/studentenhuis/2')
            .set('x-access-token', validToken)
            .send({
                "adres": "NieuwAdres"
            })
            .end((err, res) => {
                res.should.have.status(412);
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('message').equals('A name must be provided');
                response.should.have.property('code').equals(412);
                response.should.have.property('datetime').equals(res.body.datetime);

                done();
            });
    });

    it('should throw an error when adres is missing', (done) => {
        const validToken = require('./authentication.routes.test').token;

        chai.request(server)
            .put('/api/studentenhuis/2')
            .set('x-access-token', validToken)
            .send({
                "naam": "NieuweNaam"
            })
            .end((err, res) => {
                res.should.have.status(412);
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('message').equals('An address must be provided');
                response.should.have.property('code').equals(412);
                response.should.have.property('datetime').equals(res.body.datetime);

                done();
            });
    });
});

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .delete('/api/studentenhuis/2')
            .set('x-access-token', 'onzinToken')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('message').equals('No token or wrong token provided');
                response.should.have.property('code').equals(401);
                response.should.have.property('datetime').equals(res.body.datetime);

                done();
            });
    });
});