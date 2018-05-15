const assert = require('assert');
const ApiError = require('./ApiError');

class Maaltijd {
    constructor(naam, beschrijving, ingredienten, allergie, prijs) {
        try {
            assert(typeof (name) === 'string', 'naam must be a string');
            assert(typeof (beschrijving) === 'string', 'beschrijving must be a string');
            assert(typeof (ingredienten) === 'string', 'ingredienten must be a string');
            assert(typeof (allergie) === 'string', 'allergie must be a string');
            assert(typeof (prijs) === 'int', 'prijs must be an int');
        }
        catch (ex) {
            const error = new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412);
            res.status(412).send(error);
            return;
        }

        this.naam = naam.trim();
        this.beschrijving = beschrijving.trim();
        this.ingredienten = ingredienten.trim();
        this.allergie = allergie.trim();
        this.prijs = prijs;
    }
}

module.exports = Maaltijd;