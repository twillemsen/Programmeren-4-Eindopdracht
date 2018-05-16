const Maaltijd = require('../model/Maaltijd');
const assert = require('assert');
let db = require('../config/db.improved');
const auth = require('../auth/authentication');
const ApiError = require('../model/ApiError');

module.exports = {
    createMaaltijd(req, res, next){
        console.log('createMaaltijd called');
        //1
        console.log("1" +  res.domain);
        const token = req.header('x-access-token') || ''
        auth.decodeToken(token, (err, payload) => {
            if(err){
                next(new ApiError("No token or wrong token provided", 401));
            } else {
                console.log("2" + res.domain);
                try {
                    //naam, beschrijving, ingredienten, allergie, prijs
                    //2
                    console.log("3" + res.domain);
                    assert(req.body.naam, 'Er moet een naam gegeven worden');
                    assert(req.body.beschrijving, 'Er moet een beschrijving gegeven worden');
                    assert(req.body.ingredienten, 'Er moeten ingredienten gegeven worden');
                    assert(req.body.allergie, 'Vul een allergie in of /"geen"');
                    assert(typeof (req.body.prijs) === 'number', 'Vul een geldige prijs in');
                    console.log("3.5" + res.domain);
                    let id = req.params.id;
                    console.log("3.7" + res.domain);
                    let maaltijd = new Maaltijd(req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs);
                    console.log("4" + res);
                    db.query("INSERT INTO `maaltijd` (Naam, Beschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID) VALUES ('" + maaltijd.naam + "', '" + maaltijd.beschrijving + "', '" + maaltijd.ingredienten + "', '" + maaltijd.allergie + "', '" + maaltijd.prijs + "', '" + payload.sub.ID + "', '" + id + "')", (error, rows, fields) => {
                        if(error) {
                            next(error);
                        } else {
                            let incrementId = rows.insertId;
                            db.query("SELECT `Naam`, `Beschrijving`, `Ingredienten`, `Allergie`, `Prijs` FROM `maaltijd` WHERE `ID` = '" + incrementId + "'", (error, rows, fields) => {
                                if(error) {
                                    next(error);
                                } else {
                                    console.log("5" + res.domain);
                                    res.status(200).json(rows[0]).end();
                                }
                            });
                        }
                    });
                } catch (ex) {
                    console.log(JSON.stringify(ex));
                    next(new ApiError(ex.message, 412));
                }
            }
        })
    },

    getMaaltijden(req, res, next){
        console.log('maaltijd_controller.getMaaltijden');
        try{
            db.query("SELECT `Naam`, `Beschrijving`, `Ingredienten`, `Allergie`, `Prijs` FROM `maaltijd` WHERE `StudentenhuisID` = '" + req.params.id + "'", (error, rows, fields) => {
                if(error){
                    next(error);
                } else if(!Array.isArray(rows) || !rows.length) {
                    next(new ApiError("Niet gevonden (HuisID bestaat niet of heeft geen maaltijden)", 404));
                } else {
                    res.status(200).json(rows).end();
                }
            })
        } catch (ex){
            console.log(JSON.stringify(ex));
            next(new ApiError(ex.message, 401));
        }
    },

    getMaaltijdById(req, res, next){
        console.log('maaltijd_controller.getMaaltijdById');
        try{
            db.query("SELECT `Naam`, `Beschrijving`, `Ingredienten`, `Allergie`, `Prijs` FROM `maaltijd` WHERE `StudentenhuisID` = '" + req.params.id + "' AND `ID` = '" + req.params.maaltijdId + "'", (error, rows, fields) => {
                if(error){
                    next(error);
                } else if(!Array.isArray(rows) || !rows.length){
                    next(new ApiError("Niet gevonden (HuisID bestaat niet of heeft geen maaltijd)", 404));
                } else {
                    res.status(200).json(rows[0]).end();
                }
            })
        } catch (ex) {
            next(new ApiError(ex.message, 500));
        }
    },

    updateMaaltijd(req, res, next){
        console.log("maaltijd_controller.updateMaaltijd");

        const token = req.header('x-access-token') || ''
        auth.decodeToken(token, (err, payload) => {
            if(err) {
                next(new ApiError("No token or wrong token provided", 401));
            } else {
                try {
                    assert(req.body.naam, 'Er moet een naam gegeven worden');
                    assert(req.body.beschrijving, 'Er moet een beschrijving gegeven worden');
                    assert(req.body.ingredienten, 'Er moeten ingredienten gegeven worden');
                    assert(req.body.allergie, 'Vul een allergie in of /"geen"');
                    assert(typeof (req.body.prijs) === 'number', 'Vul een geldige prijs in');
                    let maaltijd = new Maaltijd(req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs);
                    db.query("SELECT `UserID` FROM  `maaltijd` WHERE `ID` = '" + req.params.maaltijdId + "' AND `StudentenhuisID` = '" + req.params.id + "'", (error, rows, fields) => {
                        if(!Array.isArray(rows) || !rows.length){
                            next(new ApiError("HuisID " + req.params.id + " of MaaltijdID " + req.params.maaltijdId + " bestaat niet.", 404));
                        } else {
                            let userId = rows[0].UserID;
                            console.log(userId);
                            if(userId !== payload.sub.ID){
                            next(new ApiError("Conflict!", 409));
                            } else {
                            db.query("UPDATE `maaltijd` SET `Naam` = '" + maaltijd.naam + "', `Beschrijving` = '" + maaltijd.beschrijving + "', `Ingredienten` = '" + req.body.ingredienten + "', `Allergie` = '" + req.body.allergie + "', `Prijs` = '" + req.body.prijs + "' WHERE `ID` = '" + req.params.maaltijdId + "' AND `UserID` = '" + payload.sub.ID + "' AND `StudentenhuisID` = '" + req.params.id + "'", (error, row, fields) => {
                                if(error){
                                    next(error);
                                } else {
                                    db.query("SELECT `Naam`, `Beschrijving`, `Ingredienten`, `Allergie`, `Prijs` FROM `maaltijd` WHERE `ID` = '" + req.params.maaltijdId + "'", (error, rows, fields) => {
                                        if(error){
                                            next(error);
                                        } else {
                                            res.status(200).json(rows[0]).end();
                                        }
                                    })
                                }
                            })
                        }
                        }
                    })
                } catch (ex) {
                    next(new ApiError(ex.message, 500));
                }
            }
        });
    },

    deleteMaaltijd(req, res, next){
        console.log('maaltijd_controller.deleteMaaltijd');
        const token = req.header('x-access-token') || ''
        auth.decodeToken(token, (err, payload) => {
            if(err) {
                next(new ApiError("No token or wrong token provided", 401));
            } else {
                try {
                    db.query("SELECT `UserID` FROM `maaltijd` WHERE `ID` = '" + req.params.maaltijdId + "' AND `StudentenhuisID` = '" + req.params.id + "'", (error, rows, fields) => {
                        if(!Array.isArray(rows) || !rows.length){
                            next(new ApiError("HuisID " + req.params.id + " of MaaltijdID " + req.params.maaltijdId + " bestaat niet.", 404));
                        } else {
                            let userId = rows[0].UserID;
                            console.log(userId);
                            if(userId !== payload.sub.ID){
                                next(new ApiError("Conflict!", 409));
                            } else {
                                db.query("DELETE FROM `maaltijd` WHERE `ID` = '" + req.params.maaltijdId + "' AND `UserID` = '" + payload.sub.ID + "'", (error, row, fields) => {
                                    res.status(200).json({"message": "Item verwijderd"}).end();
                                })
                            }
                        }
                    })
                } catch (ex) {
                    next(new ApiError(ex.message, 500));
                }
            }
        })
        }
    

    
}