const Studentenhuis = require ('../model/Studentenhuis');
const assert = require('assert');
let db = require('../config/db.improved');
const auth = require('../auth/authentication');
const test = require('../controllers/authentication.controller');
const ApiError = require('../model/ApiError');



module.exports = {
    createStudentenhuis(req, res, next){
        console.log('studentenhuiscontroller.createStudentenhuis');

    

        const token = req.header('x-access-token') || ''
        auth.decodeToken(token, (err, payload) => {
            if(err) {
                next(new ApiError("No token or wrong token provided", 401));
            } else {
                try{
                    assert(req.body.naam, 'A name must be provided');
                    assert(req.body.adres, 'An address must be provided');
                    assert(req.body.naam !== 'naam', 'gebruik (naam)');
                    assert(req.body.adres !== 'adres', 'gebruik (adres)');
                    const name = req.body.naam;
                    const address = req.body.adres;
                    console.log('We got ' + name + ' ' + address);
                    let huis = new Studentenhuis(name, address);

                    db.query("INSERT INTO `studentenhuis` (Naam, Adres, UserID) VALUES ('" + huis.name + "', '" + huis.address + "', '" + payload.sub.ID + "')", (error, rows, fields) => {
                        if(error){
                            next(error);
                        } else {
                            let id = rows.insertId;
                            db.query("SELECT * FROM `view_studentenhuis` WHERE `ID` = '" + id + "'", (error, rows, fields) => {
                                if(error){
                                    next(error);
                                } else {
                                    res.status(200).json(rows[0]).end();
                                }
                            });
                        }
                    });
                    
                    }catch(ex){
            
                        console.log(JSON.stringify(ex));
                        //return res.status(412).json(ex);
                        next(new ApiError(ex.message, 412));
                        //return new ApiError('test', 412);
                    }
            }
        });

    },

    getStudentenhuizen(req, res, next){
        console.log('studentenhuiscontroller.getStudentenhuizen');
        try{
            db.query("SELECT * FROM `studentenhuis`", (error, rows, fields) => {
                if(error){
                    next(error);
                } else {
                    res.status(200).json(rows).end();
                }
            })
        } catch(ex) {
            console.log(JSON.stringify(ex));
            //return res.status(401).json(ex);
            next(new ApiError(ex.message, 401));
        }
    },

    getStudentenhuisById(req, res, next){
        console.log('studentenhuiscontroller.getStudentenhuisById');
        try {
            db.query("SELECT * FROM `studentenhuis` WHERE `ID` = " + req.params.id + "", (error, rows, fields) => {
                console.log(rows);
                if(rows[0] === undefined){
                    console.log("HuisId " + req.params.id + " bestaat niet." );
                    //res.status(404).json(new ApiError('Niet gevonden (HuisID bestaat niet)', 404));
                    next(new ApiError("Niet gevonden (Huis ID bestaat niet", 404));
                } else {
                    if(error){
                        next(error);
                    } else {
                     res.status(200).json(rows[0]).end();
                    }
                }
            });
        } catch(ex) {
            console.log(JSON.stringify(ex));
            //return res.status(404).json(ex);
            next(new ApiError(ex.message, 500));
        }
    },

    updateStudentenhuis(req, res, next){
        console.log('studentenhuiscontroller.updateStudentenhuis');

        let naam = req.body.name;
        let adres = req.body.address;
        console.log('Got ' + naam + " en " + adres);

        const token = req.header('x-access-token') || ''
        auth.decodeToken(token, (err, payload) => {
            if(err) {
                next(new ApiError("No token or wrong token provided", 401));
            } else {

                try {
                    assert(naam, 'A name must be provided');
                    assert(adres, 'An address must be provided');
                    let huis = new Studentenhuis(naam, adres);
                    db.query("SELECT * FROM `studentenhuis` WHERE `ID` = '" + req.params.id + "'", (error, row, fields) => {
                        let userId = row[0].UserID;
                        console.log(userId);
                    
                    db.query("UPDATE `studentenhuis` SET `Naam` = '" + huis.name + "', `Adres` = '" + huis.address + "' WHERE `ID` = '" + req.params.id + "' AND `UserID` = '" + payload.sub.ID + "'", (error, rows, fields) => {
                        if(userId !== payload.sub.ID){
                            next(new ApiError("Conflict!", 409))
                        } else if(rows === undefined){
                        //if(rows === undefined){
                            console.log("HuisID " + req.params.id + " bestaat niet.");
                            next(new ApiError("Niet gevonden (HuisID bestaat niet)", 404));
                        } else {
                            if(error){
                                next(error);
                            } else {
                                db.query("SELECT * FROM `view_studentenhuis` WHERE `ID` = " + req.params.id + "", (error, rows, field) =>{
                                    res.status(200).json(rows[0]).end();
                                })
                            }
                        }
                    })
                })
                } catch (ex) {
                    console.log(JSON.stringify(ex));
                    next(new ApiError(ex.message, 412));
                }
            }
        });
    },

    deleteStudentenhuis(req, res, next){
        console.log('studentenhuiscontroller.deleteStudentenhuis');
        const token = req.header('x-access-token') || ''
        auth.decodeToken(token, (err, payload) => {
            if(err) {
                next(new ApiError("No token or wrong token provided", 401));
            } else {
                try{
                    db.query("SELECT * FROM `studentenhuis` WHERE `ID` = '" + req.params.id + "'", (error, rows, fields) => {
                        console.log(rows);
                        
                        if (!Array.isArray(rows) || !rows.length){
                            next(new ApiError("Item bestaat niet", 404));
                        // } else if(error){
                        //     next(error);
                        } else {
                            let userId = rows[0].UserID;
                            db.query("DELETE FROM `studentenhuis` WHERE `ID` = '" + req.params.id + "' AND `UserID` = '" + payload.sub.ID + "'", (error, row, fields) => {
                                if(row == undefined){
                                    next(new ApiError("Item bestaat niet", 404));
                                } else if(userId !== payload.sub.ID){
                                    next(new ApiError("Gebruiker mag dit item niet verwijderen", 409));
                                } else if (row == undefined) {
                                    next(new ApiError("Item bestaat niet"), 404);    
                                } else if(error){
                                    next(error);
                                } else {
                                    res.status(200).json({"message": "Item verwijderd"}).end();
                                }
                            })
                        
                        }
                    
                    });
                
                }catch(ex){
                    next(new ApiError(ex.message, 412));
                }
            }
        
    })
    }
}
