/**
 * Testcases aimed at testing the authentication process. 
 */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken

describe('Registration', () => {
    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({
                "firstname": "ABC",
                "lastname": "DEF",
                "email": "abc@def.nl",
                "password": "geheim"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                let response = res.body;
                let validToken = res.body.token;

                response.should.have.property('token').equals(validToken);
                response.should.have.property('email').equals('abc@def.nl');

                done();
            });

        // Tip: deze test levert een token op. Dat token gebruik je in 
        // andere testcases voor beveiligde routes door het hier te exporteren
        // en in andere testcases te importeren via require.
        // validToken = res.body.token
        module.exports = {
            token: validToken
        }
    });

    it('should return an error on GET request', (done) => {
        chai.request(server)
            .get('/api/register')
            .end((err, res) => {
                res.body.should.be.a('object');
                
                let response = res.body;

                response.should.have.property('message').equals('GET request kan niet op /api/register uitgevoerd worden');
                response.should.have.property('code').equals(404);
                response.should.have.property('datetime').equals(res.body.datetime);

                done();
            });
    });

    it('should throw an error when the user already exists', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    })

    it('should throw an error when no firstname is provided', (done) => {
        chai.request(server)
        .post('/api/register')
            .send({
                "lastname": "DEF",
                "email": "abc@def.nl",
                "password": "geheim"
            })
            .end((err, res) => {
                res.body.should.be.a('object');

                let response = res.body;

                response.should.have.property('message').equals('Een of meer properties in de request body ontbreken of zijn foutief');
                response.should.have.property('code').equals(412);
                response.should.have.property('datetime').equals(res.body.datetime);

                done();
            });
    });

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when no lastname is provided', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when email is invalid', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

})

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when email does not exist', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when email exists but password is invalid', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when using an invalid email', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

})