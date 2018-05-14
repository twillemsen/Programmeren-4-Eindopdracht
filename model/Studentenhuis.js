const assert = require('assert');
const ApiError = require('./ApiError');

class Studentenhuis {
    constructor(name, address){
        try {
            assert(typeof (name) === 'string', 'Name must be a string');
            assert(typeof (address) === 'string', 'Address must be a string');
            assert(name.trim().length > 3, 'Name must be at least 4 characters long');
            assert(address.trim().length > 5, 'Address must be longer than 5 characters');
        }catch(ex) {
            if(ex instanceof assert.AssertionError){
                throw(new Error(ex.toString()))
            }else{
                console.log('Some other error: ' + ex.toString());
            }
        }

        this.name = name.trim();
        this.address = address.trim();
    }
}

module.exports = Studentenhuis;