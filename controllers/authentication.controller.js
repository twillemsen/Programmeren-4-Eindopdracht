const auth = require('../auth/authentication');
let ApiError = require('../model/ApiError');
const assert = require('assert');
let db = require('../config/db.improved');

module.exports = {
    login (req, res, next) {
        console.log('login called');

        let email = req.body.email;
        let password = req.body.password;

        db.query('SELECT Password FROM user WHERE Email=' + email, (error, rows, fields) => {
            if (error) {
                next(error);
            } else {
                if (rows === password) {
                    const userinfo = {
                        token: auth.encodeToken(email)
                    }
        
                    res.status(200).json(userinfo).end();
                    console.log('login succesful');
                } else {
                    const error = new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412);
                    res.status(412).send(error);
                    return;
                }
            }
        });
    },

    register (req, res, next) {
        console.log('register called');

        try {
            assert(typeof (req.body.firstname) === 'string', 'firstname must be a string');
            assert(typeof (req.body.lastname) === 'string', 'lastname must be a string');
            assert(typeof (req.body.email) === 'string', 'email must be a string');
            assert(typeof (req.body.password) === 'string', 'password must be a string');
        }
        catch (ex) {
            const error = new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412);
            res.status(412).send(error);
            return;
        }

        let user = req.body;

        let query = {
            sql: 'INSERT INTO user(ID, Voornaam, Achternaam, Email, Password) VALUES (NULL, ?, ?, ?, ?)',
            values: [ user.firstname, user.lastname, user.email, user.password ],
            timeout: 2000
        }

        db.query(query, (error, rows, fields) => {
            if (error) {
                next(error);
            } else {
                const userinfo = {
                    token: auth.encodeToken({
                        "ID": rows.insertId, 
                        "email": user.email}),
                    email: user.email
                }

                res.status(200).json(userinfo).end();
                console.log('register succesful');
            }
        });
    },

    validateToken (req, res, next) {
        console.log('validateToken called');
        const token = req.header('x-access-token') || ''

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                next(new ApiError("No token or wrong token provided", 401));
            } else {
                console.log('Authenticated! Payload = ');
                console.dir(payload);
                req.user = payload.sub;
                next();
            }
        });
    }
}