const maaltijd = require('../model/Maaltijd');
const assert = require('assert');
let db = require('../config/db.improved');
const auth = require('../auth/authentication');
const ApiError = require('../model/ApiError');

module.exports = {
    createMaaltijd(req, res, next) {
        console.log('createMaaltijd called');

        
    }
}