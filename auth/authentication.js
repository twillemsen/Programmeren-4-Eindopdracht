const moment = require('moment');
const jwt = require('jwt-simple');
const config = require('../config/config');

function encodeToken(data) {
    const payload = {
        exp: moment().add(10, 'days').unix(),
        iat: moment().unix(),
        sub: data
    }
    return jwt.encode(payload, config.secretKey);
}

function decodeToken(token, callback) {
    console.log('decodeToken called');

    try {
        const payload = jwt.decode(token, config.secretKey);

        // Check if the token has expired.
        const now = moment().unix();
        if (now > payload.exp) {
            // Volgens mij wordt dit hieronder nooit aangeroepen
            console.log('Token has expired.');
            callback('Token has expired!', null);
        } else {
            callback(null, payload);
        }
    } catch (err) {
        callback(err, null);
    }
}

module.exports = {
    encodeToken,
    decodeToken
}