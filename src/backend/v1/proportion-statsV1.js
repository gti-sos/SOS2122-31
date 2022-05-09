const BASE_API_URL = "/api/v1";


var proportion_stats = [
   
   //2015

   {
        country : "Albania",
        year : 2015,
        male : 29.82, 
        female : 31.3,
        total : 22.3
    
    },

    {
        country : "Japan",
        year : 2015,
        male : 3.66, 
        female : 4.8,
        total : 2.6
        
    },

    {
        country : "Cyprus",
        year : 2015,
        male : 15.3, 
        female : 14.7,
        total : 15.93
        
    },

    {
        country : "Colombia",
        year : 2015,
        male : 20.94, 
        female : 29.9,
        total : 12.03
        
    },

    {
        country : "Honduras",
        year : 2015,
        male : 27.0, 
        female : 42.0,
        total : 11.6
        
    },

    {
        country : "Spain",
        year : 2015,
        male : 15.6, 
        female : 14.9,
        total : 16.37
        
    },

    {
        country : "Israel",
        year : 2015,
        male : 14.3, 
        female : 16.0,
        total : 12.58
        
    },

    {
        country : "Mauricio",
        year : 2015,
        male : 20.1, 
        female : 24.5,
        total : 15.69
        
    },

    {
        country : "Mexico",
        year : 2015,
        male : 19.8, 
        female : 30.8,
        total : 8.8
        
    },

    //2016

    {
        country : "Albania",
        year : 2016,
        male : 27.4, 
        female : 27.6,
        total : 27.19
    
    },

    {
        country : "Japan",
        year : 2016,
        male : 3.5, 
        female : 4.6,
        total : 2.58
        
    },

    {
        country : "Cyprus",
        year : 2016,
        male : 16.0, 
        female : 16.9,
        total : 15.02
        
    },

    {
        country : "Colombia",
        year : 2016,
        male : 21.0, 
        female : 29.2,
        total : 12.75
        
    },

    {
        country : "Honduras",
        year : 2016,
        male : 27.8, 
        female : 42.2,
        total : 12.67
        
    },

    {
        country : "Spain",
        year : 2016,
        male : 14.6, 
        female : 14.1,
        total : 15.07
        
    },

    {
        country : "Israel",
        year : 2016,
        male : 13.7, 
        female : 15.0,
        total : 12.34
        
    },

    {
        country : "Maldivas",
        year : 2016,
        male : 23.5, 
        female : 25.3,
        total : 21.52
        
    },

    {
        country : "Mauricio",
        year : 2016,
        male : 20.3, 
        female : 25.6,
        total : 15.09
        
    },

    {
        country : "Mexico",
        year : 2016,
        male : 19.5, 
        female : 30.5,
        total : 8.6
        
    },

    //2017

    {
        country : "Albania",
        year : 2017,
        male : 26.2, 
        female : 27.6,
        total : 25.08
    
    },

    {
        country : "Argentina",
        year : 2017,
        male : 19.3, 
        female : 22.8,
        total : 15.78
        
    },

    {
        country : "Japan",
        year : 2017,
        male : 3.3, 
        female : 4.4,
        total : 2.42
        
    },

    {
        country : "Cyprus",
        year : 2017,
        male : 16.1, 
        female : 16.0,
        total : 16.15
        
    },

    {
        country : "Afganistan",
        year : 2017,
        male : 42.0, 
        female : 65.9,
        total : 18.15
        
    },

    {
        country : "Colombia",
        year : 2017,
        male : 21.8, 
        female : 30.3,
        total : 13.3
        
    },

    {
        country : "Honduras",
        year : 2017,
        male : 27.7, 
        female : 42.6,
        total : 12.11
        
    },

    {
        country : "Spain",
        year : 2017,
        male : 23.3, 
        female : 12.8,
        total : 13.77
        
    },

    {
        country : "Israel",
        year : 2017,
        male : 13.6, 
        female : 15.0,
        total : 12.14
        
    },

    {
        country : "Mauricio",
        year : 2017,
        male : 19.9, 
        female : 25.1,
        total : 14.84
        
    },

    {
        country : "Mexico",
        year : 2017,
        male : 18.7, 
        female : 29.5,
        total : 8.6
        
    },

    {
        country : "Rwanda",
        year : 2017,
        male : 30.8, 
        female : 36.2,
        total : 25
        
    },

    //2018

    {
        country : "Albania",
        year : 2018,
        male : 26.6, 
        female : 27.8,
        total : 25.53
    
    },

    {
        country : "Argentina",
        year : 2018,
        male : 19.0, 
        female : 22.5,
        total : 15.52
        
    },

    {
        country : "Chad",
        year : 2018,
        male : 37.0, 
        female : 46.4,
        total : 24.81
        
    },

    {
        country : "Japan",
        year : 2018,
        male : 2.9, 
        female : 3.5,
        total : 2.23
        
    },

    {
        country : "Cyprus",
        year : 2018,
        male : 13.2, 
        female : 11.7,
        total : 14.81
        
    },

    {
        country : "Colombia",
        year : 2018,
        male : 22.6, 
        female : 31.1,
        total : 14.14
        
    },

    {
        country : "Honduras",
        year : 2018,
        male : 26.7, 
        female : 42.2,
        total : 11.56
        
    },

    {
        country : "Spain",
        year : 2018,
        male : 12.4, 
        female : 11.9,
        total : 13.01
        
    },

    {
        country : "Israel",
        year : 2018,
        male : 14.7, 
        female : 15.0,
        total : 14.36
        
    },

    {
        country : "Mauricio",
        year : 2018,
        male : 20.5, 
        female : 31.3,
        total : 17.04
        
    },

    {
        country : "Mexico",
        year : 2018,
        male : 18.4, 
        female : 23.9,
        total : 8.6
        
    },

    {
        country : "Rwanda",
        year : 2018,
        male : 30.6, 
        female : 36.2,
        total : 24.59
        
    },

    //2019

    {
        country : "Albania",
        year : 2019,
        male : 25.8, 
        female : 25.5,
        total : 26.2
    
    },

    {
        country : "Argentina",
        year : 2019,
        male : 19.2, 
        female : 21.7,
        total : 16.83
        
    },

    {
        country : "Japan",
        year : 2019,
        male : 3.1, 
        female : 3.7,
        total : 2.7
        
    },

    {
        country : "Cyprus",
        year : 2019,
        male : 13.7, 
        female : 13.1,
        total : 14.22
        
    },

    {
        country : "Colombia",
        year : 2019,
        male : 24.0, 
        female : 32.4,
        total : 15.55
        
    },

    {
        country : "Honduras",
        year : 2019,
        male : 28.1, 
        female : 43.4,
        total : 12.33
        
    },

    {
        country : "Spain",
        year : 2019,
        male : 12.1, 
        female : 11.7,
        total : 12.52
        
    },

    {
        country : "Israel",
        year : 2019,
        male : 15.4, 
        female : 15.5,
        total : 15.4
        
    },

    {
        country : "Maldivas",
        year : 2019,
        male : 27.6, 
        female : 30.0,
        total : 25.21
        
    },

    {
        country : "Mauricio",
        year : 2019,
        male : 18.1, 
        female : 21.3,
        total : 14.95
        
    },

    {
        country : "Mexico",
        year : 2019,
        male : 18.3, 
        female : 27.7,
        total : 8.88
        
    },

    {
        country : "Rwanda",
        year : 2019,
        male : 32.8, 
        female : 37.2,
        total : 27.59
        
    },

    //2020
    
    {
        country : "Afganistan",
        year : 2020,
        male : 53.8, 
        female : 74.0,
        total : 32.51
        
    },

   

   

    {
        country : "Cyprus",
        year : 2020,
        male : 14.4, 
        female : 13.5,
        total : 15.3
        
    },

    {
        country : "Spain",
        year : 2020,
        male : 13.9, 
        female : 12.9,
        total : 14.77
        
    },

    {
        country : "Israel",
        year : 2020,
        male : 17.3, 
        female : 17.1,
        total : 17.39
        
    },

    {
        country : "Mauricio",
        year : 2020,
        male : 41.7, 
        female : 47.7,
        total : 36.13
        
    },

    {
        country : "Mexico",
        year : 2020,
        male : 20.4, 
        female : 29.1,
        total : 11.81
        
    },

    {
        country : "Rwanda",
        year : 2020,
        male : 31.1, 
        female : 35.3,
        total : 26.59
        
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

    app.delete(BASE_API_URL + "/proportion-stats", (req,res)=>{
        db.remove({}, {multi:true}, (err, numRegRemoved)=>{
		if (err){
			console.error("ERROR deleting DB proportions in DELETE: "+err);
			res.sendStatus(500);
		}else{
			if(numRegRemoved==0){
				console.error("registration-stats not found");
				res.sendStatus(404);
			}else{
				res.sendStatus(200);
			}
		}
			
	    });
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