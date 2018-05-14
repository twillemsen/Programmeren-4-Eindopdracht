const auth = require('../auth/authentication');
let ApiError = require('../model/ApiError');
const assert = require

module.exports = {
    register (req, res, next) {
        console.log('register called');

        try {
            assert(typeof (req.body.firstname) === 'string', 'firstname must be a string');
            assert(typeof (req.body.lastname) === 'string', 'lastname must be a string');
            assert(typeof (req.body.email) == 'string', 'email must be a string');
            assert(typeof (req.body.password) === 'string', 'password must be a string');
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 412);
            next(error);
            return;
        }

        const userinfo = {
            token: auth.encodeToken(req.body.)
        }
    }
}