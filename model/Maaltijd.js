const assert = require('assert');
const ApiError = require('./ApiError');

class Maaltijd {
    constructor(naam, beschrijving, ingredienten, allergie, prijs) {
        try {
            assert(typeof (naam) === 'string', 'naam must be a string');
            assert(typeof (beschrijving) === 'string', 'beschrijving must be a string');
            assert(typeof (ingredienten) === 'string', 'ingredienten must be a string');
            assert(typeof (allergie) === 'string', 'allergie must be a string');
            assert(typeof (prijs) === 'number', 'prijs must be an int');
        }
        catch (ex) {
            if(ex instanceof assert.AssertionError){
                throw(new ApiError(ex.message, 412))
            }else{
                console.log('Some other error: ' + ex.message);
                throw(new ApiError(ex.message, 500))
            }
        }

        this.naam = naam.trim();
        this.beschrijving = beschrijving.trim();
        this.ingredienten = ingredienten.trim();
        this.allergie = allergie.trim();
        this.prijs = prijs;
    }
}

module.exports = Maaltijd;