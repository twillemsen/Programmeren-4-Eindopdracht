const moment = require('moment');
const jwt = require('jwt-simple');

function encodeToken(data) {
    const payload = {
        exp: moment().add(10, 'days').unix(),
        iat: moment().unix(),
        sub: data
    }
    return jwt.encode(payload, settings)
}

module.exports = {
    encodeToken
}