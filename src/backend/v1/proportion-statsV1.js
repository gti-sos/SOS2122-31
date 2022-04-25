const BASE_API_URL = "/api/v1";


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
    },

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

module.exports.register = (app,db) => {
    app.get(BASE_API_URL+"/proportion-stats/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/19589104/UyrBjwKw")
    });

    app.get(BASE_API_URL + "/proportion-stats/loadInitialData", (req, res) => {
        db.insert(proportion_stats);
        res.send(JSON.stringify(proportion_stats, null, 2));
    });

    app.get(BASE_API_URL + "/proportion-stats",(req, res)=>{
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
    
            if(req.query.limit != undefined || req.query.offset != undefined){
                newRegis = paginacion(req,newRegis);
            }
            newRegis.forEach((element)=>{
                delete element._id;
            });
            res.send(JSON.stringify(newRegis,null,2));
        })
    });

    // GET por país
    app.get(BASE_API_URL + "/proportion-stats/:country",(req, res)=>{
    
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
    
    app.get(BASE_API_URL+"/proportion-stats/:country/:year",(req, res)=>{
    
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

     app.post(BASE_API_URL + "/proportion-stats",(req, res)=>{
        
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


    app.post(BASE_API_URL + "/proportion-stats/:country", (req, res) => {
        res.sendStatus(405, "Method not allowed");
    });
    app.post(BASE_API_URL + "/proportion-stats/:year", (req, res) => {
        res.sendStatus(405, "Method not allowed");
    });

    function parametroscorrectos(req) {
        return (req.body.country == null |
            req.body.year == null |
            req.body.male == null |
            req.body.female == null |
            req.body.total == null);
    };

    app.delete(BASE_API_URL + "/proportion-stats", (req, res) => {
        proportion_stats = [];
        res.sendStatus(200, "OK");
    });


    app.delete(BASE_API_URL + "/proportion-stats/:country", (req, res) => { //borrar todos los recursos
        var countryName = req.params.country;
        proportion_stats.filter((cont) => {
            return (cont.country != countryName);
        });
        res.sendStatus(200, "OK");
    });

    app.delete(BASE_API_URL + "/proportion-stats/:country/:year",(req, res)=>{
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

    app.put(BASE_API_URL + "/proportion-stats", (req, res) => {
        res.sendStatus(405, "Method Not Allowed");
    });

    app.put(BASE_API_URL + "/proportion-stats/:country/:year",(req, res)=>{
        
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