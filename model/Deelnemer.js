const assert = require('assert');
const ApiError = require('./ApiError');

class Deelnemer {
    constructor(voornaam, achternaam, email){
        try{
            assert(typeof (naam) === 'string', 'Naam moet een string zijn');
            assert(typeof (achternaam) === 'string', 'Achternaam moet een string zijn')
            assert(typeof (email) === 'string', 'Email moet een string zijn');
            assert(validateEmail(email.trim()), 'Email moet valide zijn');
        } catch (ex) {
            if(ex instanceof assert.AssertionError){
                throw(new ApiError(ex.message, 412))
            }else{
                console.log('Some other error: ' + ex.message);
                throw(new ApiError(ex.message, 500))
            }
        }

        this.voornaam = voornaam.trim();
        this.achternaam = achternaam.trim();
        this.email = email.trim();
    }
}

function validateEmail(email) {
    const validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validator.test(email);
}

module.exports = Deelnemer;