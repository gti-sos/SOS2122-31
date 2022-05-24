const BASE_API_URL = "/api/v2";
const request = require('request');
const cors = require('cors');
const express = require("express");
const app = express();

app.use(cors());

//Proxy
var paths = '/remoteAPI';
var apiServerHost = 'https://sos2122-31.herokuapp.com/api/v2/alphabetization-stats';

app.use(paths, function (req, res) {
    var url = apiServerHost + req.url;
    console.log('piped: ' + req.url);
    req.pipe(request(url)).pipe(res);
});

var alphabetization_stats = [
    //Datos:
    //Año : 2000
    {
        country: "argentina",
        year: 2000,
        ar_ym: 98,
        ar_yw: 98,
        ar_ty: 98
    },
    {
        country: "burkina faso",
        year: 2000,
        ar_ym: 40,
        ar_yw: 26,
        ar_ty: 33
    },
    {
        country: "eeuu",
        year: 2000,
        ar_ym: 97,
        ar_yw: 91,
        ar_ty: 94
    },
    {
        country: "bangladesh",
        year: 2000,
        ar_ym: 84,
        ar_yw: 87,
        ar_ty: 85
    },
    {
        country: "chad",
        year: 2000,
        ar_ym: 41,
        ar_yw: 22,
        ar_ty: 31
    },
    {
        country: "guatemala",
        year: 2000,
        ar_ym: 95,
        ar_yw: 94,
        ar_ty: 95
    },
    {
        country: "indonesia",
        year: 2000,
        ar_ym: 100,
        ar_yw: 100,
        ar_ty: 100
    },
    {
        country: "liberia",
        year: 2000,
        ar_ym: 65,
        ar_yw: 46,
        ar_ty: 55
    },
    {
        country: "mauritania",
        year: 2000,
        ar_ym: 71,
        ar_yw: 57,
        ar_ty: 64
    },
    {
        country: "argentina",
        year: 2003,
        ar_ym: 99,
        ar_yw: 97,
        ar_ty: 98
    },
    {
        country: "burkina faso",
        year: 2002,
        ar_ym: 50,
        ar_yw: 36,
        ar_ty: 43
    },
    {
        country: "eeuu",
        year: 2004,
        ar_ym: 99,
        ar_yw: 95,
        ar_ty: 97
    },
    {
        country: "bangladesh",
        year: 2007,
        ar_ym: 90,
        ar_yw: 90,
        ar_ty: 90
    },
    {
        country: "chad",
        year: 2009,
        ar_ym: 44,
        ar_yw: 44,
        ar_ty: 44
    },
    {
        country: "guatemala",
        year: 2014,
        ar_ym: 100,
        ar_yw: 100,
        ar_ty: 100
    },
    {
        country: "indonesia",
        year: 2001,
        ar_ym: 98,
        ar_yw: 98,
        ar_ty: 98
    },
    {
        country: "liberia",
        year: 2013,
        ar_ym: 66,
        ar_yw: 47,
        ar_ty: 56
    },
    {
        country: "mauritania",
        year: 2004,
        ar_ym: 70,
        ar_yw: 50,
        ar_ty: 60
    },
    {
        country: "argentina",
        year: 2007,
        ar_ym: 96,
        ar_yw: 98,
        ar_ty: 97
    },
    {
        country: "burkina faso",
        year: 2010,
        ar_ym: 75,
        ar_yw: 25,
        ar_ty: 50
    },
    {
        country: "eeuu",
        year: 2008,
        ar_ym: 99,
        ar_yw: 90,
        ar_ty: 94
    },
    {
        country: "bangladesh",
        year: 2019,
        ar_ym: 87,
        ar_yw: 87,
        ar_ty: 87
    },
    {
        country: "chad",
        year: 2022,
        ar_ym: 45,
        ar_yw: 23,
        ar_ty: 34
    },
    {
        country: "guatemala",
        year: 2008,
        ar_ym: 99,
        ar_yw: 94,
        ar_ty: 97
    },
    {
        country: "indonesia",
        year: 1994,
        ar_ym: 85,
        ar_yw: 85,
        ar_ty: 85
    },
    {
        country: "liberia",
        year: 1997,
        ar_ym: 63,
        ar_yw: 43,
        ar_ty: 53
    },
    {
        country: "mauritania",
        year: 1996,
        ar_ym: 61,
        ar_yw: 47,
        ar_ty: 54
    },
    {
        country: "argentina",
        year: 1998,
        ar_ym: 90,
        ar_yw: 90,
        ar_ty: 90
    },
    {
        country: "burkina faso",
        year: 1993,
        ar_ym: 50,
        ar_yw: 36,
        ar_ty: 43
    },
    {
        country: "eeuu",
        year: 2018,
        ar_ym: 90,
        ar_yw: 90,
        ar_ty: 90
    },
    {
        country: "bangladesh",
        year: 2010,
        ar_ym: 85,
        ar_yw: 90,
        ar_ty: 87
    },
    {
        country: "chad",
        year: 2012,
        ar_ym: 51,
        ar_yw: 52,
        ar_ty: 51
    },
    {
        country: "guatemala",
        year: 2015,
        ar_ym: 96,
        ar_yw: 96,
        ar_ty: 96
    },
    {
        country: "indonesia",
        year: 2021,
        ar_ym: 99,
        ar_yw: 99,
        ar_ty: 99
    },
    {
        country: "liberia",
        year: 2015,
        ar_ym: 60,
        ar_yw: 40,
        ar_ty: 50
    },
    {
        country: "mauritania",
        year: 2014,
        ar_ym: 70,
        ar_yw: 50,
        ar_ty: 60
    },
    //Año : 2016
    {
        country: "argentina",
        year: 2016,
        ar_ym: 98,
        ar_yw: 98,
        ar_ty: 98
    },
    {
        country: "burkina faso",
        year: 2016,
        ar_ym: 40,
        ar_yw: 26,
        ar_ty: 33
    },
    {
        country: "eeuu",
        year: 2016,
        ar_ym: 97,
        ar_yw: 91,
        ar_ty: 94
    },
    {
        country: "bangladesh",
        year: 2016,
        ar_ym: 84,
        ar_yw: 87,
        ar_ty: 85
    },
    {
        country: "chad",
        year: 2016,
        ar_ym: 41,
        ar_yw: 22,
        ar_ty: 31
    },
    {
        country: "guatemala",
        year: 2016,
        ar_ym: 95,
        ar_yw: 94,
        ar_ty: 95
    },
    {
        country: "indonesia",
        year: 2016,
        ar_ym: 100,
        ar_yw: 100,
        ar_ty: 100
    },
    {
        country: "liberia",
        year: 2016,
        ar_ym: 65,
        ar_yw: 46,
        ar_ty: 55
    },
    {
        country: "mauritania",
        year: 2016,
        ar_ym: 71,
        ar_yw: 57,
        ar_ty: 64
    }


];
module.exports.register = (app, db) => {

    app.get(BASE_API_URL + "/alphabetization-stats/loadInitialData", (req, res) => {
        db.find({}, function (err, fL) {
            if (err) {
                res.sendStatus(500, "INTERNAL SERVER ERROR");
                return;
            }
            if (fL == 0) {
                for (var i = 0; i < alphabetization_stats.length; i++) {
                    db.insert(alphabetization_stats[i]);
                }
                res.sendStatus(200, "OK.")
                return;
            }else{
            res.sendStatus(200, "INITIALIZED")
        }
        });
    })


    app.get(BASE_API_URL + "/alphabetization-stats", (req, res) => {

        var year = req.query.year;
        var from = req.query.from;
        var to = req.query.to;

        for (var i = 0; i < Object.keys(req.query).length; i++) {
            var element = Object.keys(req.query)[i];
            if (element != "year" && element != "from" && element != "to" && element != "limit" && element != "offset") {
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        }
        if (from > to) {
            res.sendStatus(400, "BAD REQUEST");
            return;
        }

        db.find({}, function (err, newRegis) {
            if (err) {
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }
            if (year != null) {
                var newRegis = newRegis.filter((reg) => {
                    return (reg.year == year);
                });
                if (newRegis == 0) {
                    res.sendStatus(404, "NO EXISTE");
                    return;
                }
            }
            if (from != null && to != null) {
                newRegis = newRegis.filter((reg) => {
                    return (reg.year >= from && reg.year <= to);
                });
                if (newRegis == 0) {
                    res.sendStatus(404, "NO EXISTE");
                    return;
                }
            }
            if (req.query.limit != undefined || req.query.offset != undefined) {
                newRegis = paginacion(req, newRegis);
            }
            newRegis.forEach((element) => {
                delete element._id;
            });
            res.send(JSON.stringify(newRegis, null, 2));
        })
    });

    app.get(BASE_API_URL + "/alphabetization-stats/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/19594199/UyxjEkWE")
    });

    app.get(BASE_API_URL + "/alphabetization-stats/:country", (req, res) => {

        var country = req.params.country;
        var from = req.query.from;
        var to = req.query.to;

        for (var i = 0; i < Object.keys(req.query).length; i++) {
            var element = Object.keys(req.query)[i];
            if (element != "from" && element != "to") {
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        }
        if (from > to) {
            res.sendStatus(400, "BAD REQUEST");
            return;
        }

        db.find({}, function (err, newRegis) {
            if (err) {
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            newRegis = newRegis.filter((reg) => {
                return (reg.country == country);
            });
            var from = req.query.from;
            var to = req.query.to;

            if (from > to) {
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
            if (from != null && to != null && from <= to) {
                newRegis = newRegis.filter((reg) => {
                    return (reg.year >= from && reg.year <= to);
                });
            }
            if (newRegis == 0) {
                res.sendStatus(404, "NO EXISTE");
                return;
            }
            if (req.query.limit != undefined || req.query.offset != undefined) {
                newRegis = paginacion(req, newRegis);
            }
            newRegis.forEach((element) => {
                delete element._id;
            });
            res.send(JSON.stringify(newRegis, null, 2));
        })

    });


    app.get(BASE_API_URL + "/alphabetization-stats/:country/:year", (req, res) => {

        var country = req.params.country
        var year = req.params.year

        db.find({}, function (err, newRegis) {
            if (err) {
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }
            newRegis = newRegis.filter((reg) => {
                return (reg.country == country && reg.year == year);
            });
            if (newRegis == 0) {
                res.sendStatus(404, "NO EXISTE");
                return;
            }
            if (req.query.limit != undefined || req.query.offset != undefined) {
                newRegis = paginacion(req, newRegis);
                res.send(JSON.stringify(newRegis, null, 2));
            }
            newRegis.forEach((element) => {
                delete element._id;
            });
            res.send(JSON.stringify(newRegis[0], null, 2));
        });

    });

    function paginacion(req, lista) {

        var res = [];
        const limit = req.query.limit;
        const offset = req.query.offset;

        if (limit < 1 || offset < 0 || offset > lista.length) {
            res.push("ERROR EN PARAMETROS LIMIT Y/O OFFSET");
            return res;
        }
        res = lista.slice(offset, parseInt(limit) + parseInt(offset));
        return res;
    };

    app.post(BASE_API_URL + "/alphabetization-stats", (req, res) => {

        if (parametroscorrectos(req)) {
            res.sendStatus(400, "BAD REQUEST - Parametros incorrectos");
        } else {

            db.find({}, function (err, regisNew) {

                if (err) {
                    res.sendStatus(500, "ERROR EN CLIENTE");
                    return;
                }

                regisNew = regisNew.filter((reg) => {
                    return (req.body.country == reg.country && req.body.year == reg.year)
                })

                if (regisNew.length != 0) {
                    res.sendStatus(409, "CONFLICT");
                } else {
                    db.insert(req.body);
                    res.sendStatus(201, "CREATED");
                }
            })
        }
    });

    app.post(BASE_API_URL + "/alphabetization-stats/:country", (req, res) => {
        res.sendStatus(405, "Method not allowed");
    });
    app.post(BASE_API_URL + "/alphabetization-stats/:year", (req, res) => {
        res.sendStatus(405, "Method not allowed");
    });
    app.post(BASE_API_URL + "/alphabetization-stats/:country/:year", (req, res) => {
        res.sendStatus(405, "Method not allowed");
    });

    function parametroscorrectos(req) {
        return (req.body.country == null |
            req.body.year == null |
            req.body.ar_yw == null |
            req.body.ar_yw == null |
            req.body.ar_ty == null |
            req.body.country === "" |
            req.body.year === "" |
            req.body.ar_ym === "" |
            req.body.ar_yw === "" |
            req.body.ar_ty === "");
    };

    app.delete(BASE_API_URL + "/alphabetization-stats/", (req, res) => {
        db.remove({}, { multi: true }, (err, numRegRemoved) => {
            if (err) {
                console.error("ERROR deleting DB alphabetizations in DELETE: " + err);
                res.sendStatus(500);
            } else {
                if (numRegRemoved == 0) {
                    console.error("alphabetization-stats not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }

        });
    });

    app.delete(BASE_API_URL + "/alphabetization-stats/:country", (req, res) => {
        var countryName = req.params.country;
        alphabetization_stats.filter((cont) => {
            return (cont.country != countryName);
        });
        res.sendStatus(200, "OK");
    });

    app.delete(BASE_API_URL + "/alphabetization-stats/:country/:year", (req, res) => {
        var countryR = req.params.country;
        var yearR = req.params.year;
        db.find({ country: countryR, year: parseInt(yearR) }, {}, (err, filteredList) => {
            if (err) {
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }
            if (filteredList == 0) {
                res.sendStatus(404, "NOT FOUND");
                return;
            }
            db.remove({ country: countryR, year: parseInt(yearR) }, {}, (err, numRemoved) => {
                if (err) {
                    res.sendStatus(500, "ERROR EN CLIENTE");
                    return;
                }

                res.sendStatus(200, "DELETED");
                return;

            });
        });
    });

    app.put(BASE_API_URL + "/alphabetization-stats", (req, res) => {
        res.sendStatus(405, "Method Not Allowed");
    });

    app.put(BASE_API_URL + "/alphabetization-stats/:country/:year", (req, res) => {

        if (parametroscorrectos(req)) {
            res.sendStatus(400, "BAD REQUEST - Parametros incorrectos");
            return;
        }

        var countryR = req.params.country;
        var yearR = req.params.year;
        var body = req.body;

        db.find({}, function (err, filteredList) {
            if (err) {
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            filteredList = filteredList.filter((reg) => {
                return (reg.country == countryR && reg.year == yearR);
            });
            if (filteredList == 0) {
                res.sendStatus(404, "NO EXISTE");
                return;
            }

            if (countryR != body.country || yearR != body.year) {
                res.sendStatus(400, "BAD REQUEST");
                return;
            }

            db.update({ $and: [{ country: String(countryR) }, { year: parseInt(yearR) }] }, { $set: body }, {}, function (err, numUpdated) {
                if (err) {
                    res.sendStatus(500, "ERROR EN CLIENTE");
                } else {
                    res.sendStatus(200, "UPDATED");
                }
            });
        })
    })
};