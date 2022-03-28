const BASE_API_URL = "/api/v1";
var Datastore = require("nedb");

var path = require('path');
var datafile = path.join(__dirname, 'proportion-stats.db');
var db = new Datastore({filename: datafile, autoload:true});

const bodyParser = require("body-parser");
var proportion_stats = [
    {
        country : "Argentina",
        year : 2020,
        total : 22.3, 
        male : 21, 
        female : 23.7
    },

    {
        country : "Argentina",
        year : 2019,
        total : 24.3, 
        male : 22, 
        female : 26.7
    },

    {
        country : "Chad",
        year : 2018,
        total : 37, 
        male : 24.8, 
        female : 46.4
    },

    {
        country : "Japan",
        year : 2019,
        total : 3.1, 
        male : 2.7, 
        female : 3.7
    }

];

module.exports.register = (app) => {
    //GET:

    app.get(BASE_API_URL + "/proportion-stats", (req,res)=>{
        db.insert(proportion_stats);
        res.send(JSON.stringify(proportion_stats, null,2));
    });

    app.get(BASE_API_URL + "/registration-stats/loadInitialData",(req, res)=>{
    
        if(registration_stats.length==0){
            registration_stats =[

                {
                    contry: "Afganistan",
                    year: 2020,
                    total: 53.8, 
                    male: 32.2,
                    female: 74.0
                },

                {
                    contry: "Albania",
                    year: 2019,
                    total: 25.8, 
                    male: 26.2,
                    female: 25.5
                },

                {
                    contry: "Chipre",
                    year: 2020,
                    total: 14.4, 
                    male: 15.3,
                    female: 13.5
                },

                {
                    contry: "Colombia",
                    year: 2019,
                    total: 24.0, 
                    male: 15.6,
                    female: 32.4
                },

                {
                    contry: "Honduras",
                    year: 2019,
                    total: 28.1, 
                    male: 12.3,
                    female: 43.4
                },

                {
                    contry: "Israel",
                    year: 2020,
                    total: 17.3, 
                    male: 17.4,
                    female: 17.1
                },

                {
                    contry: "Mauricio",
                    year: 2020,
                    total: 41.7, 
                    male: 36.4,
                    female: 47.7
                },

                {
                    contry: "Mexico",
                    year: 2020,
                    total: 20.4, 
                    male: 11.8,
                    female: 29.1
                },

                {
                    contry: "Rwanda",
                    year: 2020,
                    total: 31.0, 
                    male: 26.6,
                    female: 35.3
                }
            ];
        }
        res.sendStatus(200, "OK")

    });
    app.get(BASE_API_URL+"/proportion-stats/docs", (req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/19589104/UVyoUwzV")
    });

    app.get(BASE_API_URL + "/proportion-stats/:country", (req,res)=>{
        var countryName = req.params.country;
        filteredCountry = proportion_stats.filter((cont) =>{
        return (cont.country == countryName); 
        });
        if(filteredCountry == 0){
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredCountry, null,2));
        }
    });

    app.get(BASE_API_URL + "/proportion-stats/:country/:year", (req,res)=>{
        var countryName = req.params.country;
        var yearName = req.params.year;
        filteredYear = proportion_stats.filter((cont) =>{
        return (cont.country == countryName) && (cont.year == yearName);     
        });
    
        if(filteredYear == 0){
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredYear, null,2));
        }
    });

    app.get(BASE_API_URL + "/proportion-stats", (req,res)=>{
        res.send(JSON.stringify(proportion_stats, null,2));
    });


    //POST

    app.post(BASE_API_URL + "/proportion-stats/:country", (req,res)=>{
        res.sendStatus(405, "Method not allowed");
    });

    app.post(BASE_API_URL + "/proportion-stats/:year", (req,res)=>{
        res.sendStatus(405, "Method not allowed");
    });

    function parametroscorrectos(req){
        return (req.body.country == null |
                 req.body.year == null | 
                 req.body.total == null | 
                 req.body.male == null | 
                 req.body.female == null);
    };

    app.post(BASE_API_URL+ "/proportion-stats",(req, res)=>{
        if(parametroscorrectos(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{ 
            var postProportion = proportion_stats.filter((reg)=>{
            return (req.body.country == reg.country && req.body.year == reg.year)
        });
        if(postProportion.length != 0){
            res.sendStatus(409,"CONFLICT");
        }else{
            proportion_stats.push(req.body);
            res.sendStatus(201,"CREATED");
        }
    }
    });

    //DELETE

    app.delete(BASE_API_URL + "/proportion-stats", (req,res)=>{ 
        proportion_stats = [];
        res.sendStatus(200, "OK");
    });

    app.delete(BASE_API_URL + "/proportion-stats/:country", (req,res)=>{ //borrar todos los recursos
        var countryName = req.params.country;
        proportion_stats.filter((cont) =>{
            return (cont.country != countryName); 
        });
        res.sendStatus(200, "OK");
    });

    app.delete(BASE_API_URL + "/proportion-stats/:country/:year", (req,res)=>{ //borrar todos los recursos
        var countryName = req.params.country;
        var yearName = req.params.year;
        proportion_stats.filter((cont) =>{
            return (cont.country != countryName) || (cont.year != yearName); 
        });
        res.sendStatus(200, "OK");
    });

    //PUT

    app.put(BASE_API_URL + "/proportion-stats", (req,res)=>{
        res.sendStatus(405, "Method Not Allowed");
    });

    app.put(BASE_API_URL+"/proportion-stats/:country/:year",(req, res)=>{
        
        if(paramOK(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{
            var country = req.params.country;
            var year = req.params.year;
            var body = req.body;  
            var tl = proportion_stats.findIndex((reg) =>{
                return (reg.country == country && reg.year == year)
            });
            if(tl == null){
                res.sendStatus(404,"NOT FOUND");
            }else if(country != body.country || year != body.year){
                res.sendStatus(400,"BAD REQUEST");
            }else{
                var  update_Proportion = {...body};
                proportion_stats[tl] = update_Proportion;
            
                res.sendStatus(200,"UPDATED");
            }
        }
    });

};