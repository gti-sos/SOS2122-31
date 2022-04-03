const BASE_API_URL = "/api/v1";
const bodyParser = require("body-parser");
var Datastore = require("nedb");

var path = require('path');
var datafile = path.join(__dirname, 'registration-stats.db');
var db = new Datastore({filename: datafile, autoload:true});

var registration_stats = [{
    country: "germany",
    year: 2019,
    primarylevel: 103,
    secondarylevel: 98,
    tertiarylevel: 74

},
{
    country: "españa",
    year: 2015,
    primarylevel: 106,
    secondarylevel: 125,
    tertiarylevel: 86

},

{
    country: "eeuu",
    year: 2005,
    primarylevel: 102,
    secondarylevel: 95,
    tertiarylevel: 81

},

{
    country: "canada",
    year: 1995,
    primarylevel: 102,
    secondarylevel: 105,
    tertiarylevel: 91

},

{
    country: "indonesia",
    year: 1992,
    primarylevel: 111,
    secondarylevel: 44,
    tertiarylevel: 9

},
{
    country: "china",
    year: 1987,
    primarylevel: 126,
    secondarylevel: 35,
    tertiarylevel: 3

},
{
    country: "francia",
    year: 2001,
    primarylevel: 100,
    secondarylevel: 105,
    tertiarylevel: 50

},
{
    country: "santaLucia",
    year: 1974,
    primarylevel: 114,
    secondarylevel: 30,
    tertiarylevel: 0

},
{
    country: "argentina",
    year: 2010,
    primarylevel: 117,
    secondarylevel: 100,
    tertiarylevel: 73

}

];


module.exports.register = (app) => {

    app.get(BASE_API_URL + "/registration-stats/loadInitialData", (req, res) => {
        db.insert(registration_stats);
        res.send(JSON.stringify(registration_stats, null, 2));
    });

    app.get(BASE_API_URL + "/registration-stats",(req, res)=>{
    
        var year = req.query.year;
        var from = req.query.from;
        var to = req.query.to;

        //Comprobamos query

        for(var i = 0; i<Object.keys(req.query).length;i++){
            var element = Object.keys(req.query)[i];
            if(element != "year" && element != "from" && element != "to" && element != "limit" && element != "offset"){
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        }

        //Comprobamos si from es mas pequeño o igual a to
        if(from>to){
            res.sendStatus(400, "BAD REQUEST");
            return;
        }

        db.find({},function(err, newRegis){

            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            // Apartado para búsqueda por año
            
            if(year != null){
                var newRegis = newRegis.filter((reg)=>
                {
                    return (reg.year == year);
                });
                if (newRegis==0){
                    res.sendStatus(404, "NO EXISTE");
                    return;
                }
            }
    
            // Apartado para from y to
            
            if(from != null && to != null){
                newRegis = newRegis.filter((reg)=>
                {
                    return (reg.year >= from && reg.year <=to);
                });
    
                if (newRegis==0){
                    res.sendStatus(404, "NO EXISTE");
                    return;
                }    

                
            }
            // RESULTADO
    
            if(req.query.limit != undefined || req.query.offset != undefined){
                newRegis = paginacion(req,newRegis);
            }
            newRegis.forEach((element)=>{
                delete element._id;
            });
            res.send(JSON.stringify(newRegis,null,2));
        })
    });

    app.get(BASE_API_URL+"/registration-stats/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/19505610/UVyn2Jnb")
    });
    // GET por país
    
    app.get(BASE_API_URL + "/registration-stats/:country",(req, res)=>{
    
        var country =req.params.country;
        var from = req.query.from;
        var to = req.query.to;

        //Comprobamos query
        for(var i = 0; i<Object.keys(req.query).length;i++){
            var element = Object.keys(req.query)[i];
            if(element != "from" && element != "to"){
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        }

        //Comprobamos si from es mas pequeño o igual a to
        if(from>to){
            res.sendStatus(400, "BAD REQUEST");
            return;
        }

        db.find({}, function(err,newRegis){
            
            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            newRegis = newRegis.filter((reg)=>
            {
                return (reg.country == country);
            });
        
            // Apartado para from y to
            var from = req.query.from;
            var to = req.query.to;
    
            //Comprobamos si from es mas pequeño o igual a to
            if(from>to){
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        
            if(from != null && to != null && from<=to){
                newRegis = newRegis.filter((reg)=>
                {
                   return (reg.year >= from && reg.year <=to);
                }); 
                
            }
            //COMPROBAMOS SI EXISTE
            if (newRegis==0){
                res.sendStatus(404, "NO EXISTE");
                return;
            }
            //RESULTADO
            if(req.query.limit != undefined || req.query.offset != undefined){
                newRegis = paginacion(req,newRegis);
            }
            newRegis.forEach((element)=>{
                delete element._id;
            });
            res.send(JSON.stringify(newRegis,null,2));
        })

    });
    
    // GET por país y año
    
    app.get(BASE_API_URL+"/registration-stats/:country/:year",(req, res)=>{
    
        var country =req.params.country
        var year = req.params.year

        db.find({},function(err, newRegis){

            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            newRegis = newRegis.filter((reg)=>
            {
                return (reg.country == country && reg.year == year);
            });
            if (newRegis==0){
                res.sendStatus(404, "NO EXISTE");
                return;
            }
    
            //RESULTADO
    
            //Paginación
            if(req.query.limit != undefined || req.query.offset != undefined){
                newRegis = paginacion(req,newRegis);
                res.send(JSON.stringify(newRegis,null,2));
            }
            newRegis.forEach((element)=>{
                delete element._id;
            });
            res.send(JSON.stringify(newRegis[0],null,2));
        });

    });

    function paginacion(req, lista){

        var res = [];
        const limit = req.query.limit;
        const offset = req.query.offset;
        
        if(limit < 1 || offset < 0 || offset > lista.length){
            res.push("ERROR EN PARAMETROS LIMIT Y/O OFFSET");
            return res;
        }

        res = lista.slice(offset,parseInt(limit)+parseInt(offset));
        return res;

    };

     app.post(BASE_API_URL + "/registration-stats",(req, res)=>{
        
        if(parametroscorrectos(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{

            db.find({},function(err,regisNew){

                if(err){
                    res.sendStatus(500, "ERROR EN CLIENTE");
                    return;
                }

                regisNew = regisNew.filter((reg)=>
                {
                    return(req.body.country == reg.country && req.body.year == reg.year)
                })
            
                if(regisNew.length != 0){
                    res.sendStatus(409,"CONFLICT");
                }else{
                    db.insert(req.body);
                    res.sendStatus(201,"CREATED");
                }
            })
        }
    
    });


    app.post(BASE_API_URL + "/registration-stats/:country", (req, res) => {
        res.sendStatus(405, "Method not allowed");
    });
    app.post(BASE_API_URL + "/registration-stats/:year", (req, res) => {
        res.sendStatus(405, "Method not allowed");
    });

    function parametroscorrectos(req) {
        return (req.body.country == null |
            req.body.year == null |
            req.body.primarylevel == null |
            req.body.secondarylevel == null |
            req.body.tertiarylevel == null);
    };

    app.delete(BASE_API_URL + "/registration-stats", (req, res) => {
        registration_stats = [];
        res.sendStatus(200, "OK");
    });


    app.delete(BASE_API_URL + "/registration-stats/:country", (req, res) => { //borrar todos los recursos
        var countryName = req.params.country;
        registration_stats.filter((cont) => {
            return (cont.country != countryName);
        });
        res.sendStatus(200, "OK");
    });

    app.delete(BASE_API_URL + "/registration-stats/:country/:year",(req, res)=>{
        var countryR = req.params.country;
        var yearR = req.params.year;

        db.find({country: countryR, year: parseInt(yearR)}, {}, (err, regisNew)=>{
            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
            if(regisNew==0){
                res.sendStatus(404,"NOT FOUND");
                return;
            }
            db.remove({country: countryR, year: yearR}, {}, (err, numRemoved)=>{
                if (err){
                    res.sendStatus(500,"ERROR EN CLIENTE");
                    return;
                }
            
                res.sendStatus(200,"DELETED");
                return;
                
            });
        });

    })







    app.put(BASE_API_URL + "/registration-stats", (req, res) => {
        res.sendStatus(405, "Method Not Allowed");
    });

    app.put(BASE_API_URL + "/registration-stats/:country/:year",(req, res)=>{
        
        //COMPROBAMOS FORMATO JSON

        if(parametroscorrectos(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
            return;
        }
        
        var countryRegis = req.params.country;
        var yearRegis = req.params.year;
        var body = req.body;  

        db.find({},function(err,regisNew){
            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            //COMPROBAMOS SI EXISTE EL ELEMENTO

            regisNew = regisNew.filter((reg)=>
            {
                return (reg.country == countryRegis && reg.year == yearRegis);
            });
            if (regisNew==0){
                res.sendStatus(404, "NO EXISTE");
                return;
            }

            //COMPROBAMOS SI LOS CAMPOS ACTUALIZADOS SON IGUALES

            if(countryRegis != body.country || yearRegis != body.year){
                res.sendStatus(400,"BAD REQUEST");
                return;
            }

            //ACTUALIZAMOS VALOR
                
            db.update({$and:[{country: String(countryRegis)}, {year: parseInt(yearRegis)}]}, {$set: body}, {},function(err, numUpdated) {
                if (err) {
                    res.sendStatus(500, "ERROR EN CLIENTE");
                }else{
                    res.sendStatus(200,"UPDATED");
                }
            });
        })
            
        
    
    })




};