const BASE_API_URL = "/api/v2";
const bodyParser = require("body-parser");

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


module.exports.register = (app,db) => {

    app.get(BASE_API_URL + "/registration-stats/loadInitialData", (req, res) => {
        db.insert(registration_stats);
        res.send(JSON.stringify(registration_stats, null, 2));
    });

    app.get(BASE_API_URL + "/registration-stats",(req, res)=>{
    
        var year = req.query.year;
        var from = req.query.from;
        var to = req.query.to;


        for(var i = 0; i<Object.keys(req.query).length;i++){
            var element = Object.keys(req.query)[i];
            if(element != "year" && element != "from" && element != "to" && element != "limit" && element != "offset"){
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        }

        if(from>to){
            res.sendStatus(400, "BAD REQUEST");
            return;
        }

        db.find({},function(err, newRegis){

            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            
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

    app.get(BASE_API_URL+"/registration-stats/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/19505610/UVyn2Jnb")
    });
    
    app.get(BASE_API_URL + "/registration-stats/:country",(req, res)=>{
    
        var country =req.params.country;
        var from = req.query.from;
        var to = req.query.to;

        for(var i = 0; i<Object.keys(req.query).length;i++){
            var element = Object.keys(req.query)[i];
            if(element != "from" && element != "to"){
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        }
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
            var from = req.query.from;
            var to = req.query.to;
    
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
            if (newRegis==0){
                res.sendStatus(404, "NO EXISTE");
                return;
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
            res.push("Error en parametros");
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
    app.post(BASE_API_URL + "/registration-stats/:country/:year", (req, res) => {
        res.sendStatus(405, "Method not allowed");
    });

    function parametroscorrectos(req) {
        console.log(req.body);
        return (req.body.country == null |
            req.body.year == null |
            req.body.primarylevel == null |
            req.body.secondarylevel == null |
            req.body.tertiarylevel == null | 
            req.body.country === ""  |
            req.body.year === "" |
            req.body.primarylevel === "" |
            req.body.secondarylevel === "" |
            req.body.tertiarylevel === "");     
    };

    app.delete(BASE_API_URL + "/registration-stats", (req,res)=>{
        db.remove({}, {multi:true}, (err, numRegRemoved)=>{
		if (err){
			console.error("ERROR deleting DB registrations in DELETE: "+err);
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



    app.delete(BASE_API_URL+"/registration-stats/:country/:year", (req,res)=>{
        var countryD = req.params.country;
		var yearD =  parseInt(req.params.year);
		db.remove({ $and: [{ country: countryD}, {year: yearD }] }, {}, (err, numRegRemoved)=>{
		if (err){
			console.error("ERROR deleting DB reg in DELETE: "+err);
			res.sendStatus(500);
		}else{
			
			if(numRegRemoved==0){
				console.error("No data found");
				res.sendStatus(404);
			}else{
				console.log(`stat with country: <${countryD}> and year: <${yearD}> deleted`);
				res.sendStatus(200);
			}
		}
	});
    });







    app.put(BASE_API_URL + "/registration-stats", (req, res) => {
        res.sendStatus(405, "Method Not Allowed");
    });

    app.put(BASE_API_URL+"/registration-stats/:country/:year",(req, res)=>{
        
        if(parametroscorrectos(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
            return;
        }
        
        var countryR = req.params.country;
        var yearR = req.params.year;
        var body = req.body;  

        db.find({},function(err,filteredList){
            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }

            filteredList = filteredList.filter((reg)=>
            {
                return (reg.country == countryR && reg.year == yearR);
            });
            if (filteredList==0){
                res.sendStatus(404, "NO EXISTE");
                return;
            }

            if(countryR != body.country || yearR != body.year){
                res.sendStatus(400,"BAD REQUEST");
                return;
            }
                
            db.update({$and:[{country: String(countryR)}, {year: parseInt(yearR)}]}, {$set: body}, {},function(err, numUpdated) {
                if (err) {
                    res.sendStatus(500, "ERROR EN CLIENTE");
                }else{
                    res.sendStatus(200,"UPDATED");
                }
            });
        })
            
        
    
    })




};