const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Studentenhuis API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        const validToken = require('./authentication.routes.test').token;

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
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})

describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return all studentenhuizen when using a valid token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return an error when using an non-existing huisId', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})