const Deelnemer = require('../model/Deelnemer');
const assert = require('assert');
let db = require('../config/db.improved');
const auth = require('../auth/authentication');
const ApiError = require('../model/ApiError');

module.exports = {
    createDeelnemer(req, res, next){
        const token = req.header('x-access-token') || ''
        auth.decodeToken(token, (err, payload) => {
            if(err) {
                next(new ApiError("No token or wrong token provided", 401));
            } else {
                try{
                    console.log(payload);
                    db.query("SELECT `UserID` from `deelnemers` WHERE `UserID` = '" + payload.sub.ID + "'", (error, rows, fields) => {
                        if(!Array.isArray(rows) || !rows.length){
                            db.query("INSERT INTO `deelnemers` (UserID, StudentenhuisID, MaaltijdID) VALUES ('" + payload.sub.ID + "', '" + req.params.id + "', '" + req.params.maaltijdId + "')", (error, rows, fields) => {
                                if(error){
                                    next(error);
                                }else {
                                    db.query("SELECT `Voornaam`, `Achternaam`, `Email` FROM `user` WHERE `ID` = '" + payload.sub.ID + "'", (error, rows, fields) => {
                                        if(error){
                                            next(error);
                                        } else {
                                            res.status(200).json(rows[0]).end();
                                        }
                                    })
                                }
                            })
                            
                         } else {
                             next(new ApiError("Gebruiker al aangemeld", 409));
                         }
                    })
                } catch(ex){
                    new ApiError(ex.message, 500);
                }
            }
        })
    },

    getDeelnemers(req, res, next){
        console.log("deelnemer_controller.getDeelnemers");
        try {
            db.query("SELECT * FROM `view_deelnemers`", (error, rows, fields) => {
                if(error){
                    next(error);
                } else {
                    res.status(200).json(rows).end();
                }
            })
        } catch(ex) {
            next(new ApiError(ex.message, 500));
        }
    },

    deleteDeelnemer(req, res, next){
        console.log('deelnemer_controller.deleteDeelnemer');
        const token = req.header('x-access-token') || ''
        auth.decodeToken(token, (err, payload) => {
            if(err) {
                next(new ApiError("No token or wrong token provided", 401));
            } else {
                try{
                    db.query("SELECT `UserID` FROM `deelnemers` WHERE `UserID` = '" + payload.sub.ID + "'", (error, rows, fields) => {
                        if(error){
                            next(error);
                        } else if(!Array.isArray(rows) || !rows.length){
                            next(new ApiError("Gebruiker is niet aangemeld voor maaltijd", 404));
                        } else if(rows){
                            if(rows[0].UserID !== payload.sub.ID){
                                next(new ApiError("Conflict", 409));
                            } else {
                                db.query("DELETE FROM `deelnemers` WHERE `UserID` = '" + payload.sub.ID + "'", (error, results, fields) => {
                                    if(error){
                                        next(error);
                                    } else {
                                        res.status(200).json({"message": "Deelnemer verwijderd"}).end();
                                    }
                                })
                            }
                        }
                    })
                } catch(ex) {
                    next(new ApiError(ex.message, 500));
                }
    }
})
    }
}