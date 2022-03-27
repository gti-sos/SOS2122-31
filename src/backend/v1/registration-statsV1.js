const BASE_API_URL = "/api/v1";
var Datastore = require("nedb");

var path = require('path');
var datafile = path.join(__dirname, 'registration-stats.db');
var db = new Datastore({ filename: datafile, autoload: true});

const bodyParser = require("body-parser");
var registration_stats = [
    {
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
    
    //app.get(BASE_API_URL + "/registration-stats", (req,res)=>{
    //    res.send(JSON.stringify(registration_stats, null,2));
    //});

    //app.get(BASE_API_URL + "/registration-stats/loadInitialData", (req,res)=>{
    //    db.insert(registration_stats);
    //    res.send(JSON.stringify(registration_stats, null,2));
    //});

    app.get(BASE_API_URL + "/registration-stats", (req,res)=>{
        db.insert(registration_stats);
        res.send(JSON.stringify(registration_stats, null,2));
    });

    app.get(BASE_API_URL + "/registration-stats/loadInitialData",(req, res)=>{
    
        if(registration_stats.length==0){
            registration_stats = [
                {
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
        }
        res.sendStatus(200, "OK.")
        
    });
    app.get(BASE_API_URL+"/registration-stats/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/19505610/UVyn2Jnb")

    });

    app.get(BASE_API_URL + "/registration-stats/:country", (req,res)=>{
        var countryName = req.params.country;
        filteredCountry = registration_stats.filter((cont) =>{
        return (cont.country == countryName); 
        
        });
    
        if(filteredCountry == 0){
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredCountry, null,2));
        }
    });
    
    
    app.get(BASE_API_URL + "/registration-stats/:country/:year", (req,res)=>{
        var countryName = req.params.country;
        var yearName = req.params.year;
        filteredYear = registration_stats.filter((cont) =>{
        return (cont.country == countryName) && (cont.year == yearName); 
        
        });
    
        if(filteredYear == 0){
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredYear, null,2));
        }
    });


    app.get(BASE_API_URL + "/registration-stats", (req,res)=>{
        res.send(JSON.stringify(registration_stats, null,2));
    });



    app.post(BASE_API_URL + "/registration-stats/:country", (req,res)=>{
        res.sendStatus(405, "Method not allowed");
    });
    app.post(BASE_API_URL + "/registration-stats/:year", (req,res)=>{
        res.sendStatus(405, "Method not allowed");
    });

    function parametroscorrectos(req){
        return (req.body.country == null |
                 req.body.year == null | 
                 req.body.primarylevel == null | 
                 req.body.secondarylevel == null | 
                 req.body.tertiarylevel == null);
    };

    app.post(BASE_API_URL+ "/registration-stats",(req, res)=>{
        if(parametroscorrectos(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{ 
            var postRegistration = registration_stats.filter((reg)=>{
            return (req.body.country == reg.country && req.body.year == reg.year)
        });
        if(postRegistration.length != 0){
            res.sendStatus(409,"CONFLICT");
        }else{
            registration_stats.push(req.body);
            res.sendStatus(201,"CREATED");
        }
    }
    });

    app.delete(BASE_API_URL + "/registration-stats", (req,res)=>{ 
        registration_stats = [];
        res.sendStatus(200, "OK");
    });
    
    
    app.delete(BASE_API_URL + "/registration-stats/:country", (req,res)=>{ //borrar todos los recursos
        var countryName = req.params.country;
        registration_stats.filter((cont) =>{
            return (cont.country != countryName); 
        });
        res.sendStatus(200, "OK");
    });
    
    app.delete(BASE_API_URL + "/registration-stats/:country/:year", (req,res)=>{ //borrar todos los recursos
        var countryName = req.params.country;
        var yearName = req.params.year;
        registration_stats.filter((cont) =>{
            return (cont.country != countryName) || (cont.year != yearName); 
        });
        res.sendStatus(200, "OK");
    });
    
    



    

    app.put(BASE_API_URL + "/registration-stats", (req,res)=>{
        res.sendStatus(405, "Method Not Allowed");
    });


    app.put(BASE_API_URL+"/registration-stats/:country/:year",(req, res)=>{
        
        if(parametroscorrectos(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{
            var country = req.params.country;
            var year = req.params.year;
            var body = req.body;  
            var tl = registration_stats.findIndex((reg) =>{
                return (reg.country == country && reg.year == year)
            });
            if(tl == null){
                res.sendStatus(404,"NOT FOUND");
            }else if(country != body.country || year != body.year){
                res.sendStatus(400,"BAD REQUEST");
            }else{
                var  update_registrations = {...body};
                registration_stats[tl] = update_registrations;
            
                res.sendStatus(200,"UPDATED");
            }
        }
    
    });
    



};

