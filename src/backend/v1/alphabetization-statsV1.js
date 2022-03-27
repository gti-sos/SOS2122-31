const BASE_API_URL = "/api/v1";

var alphabetization_stats = [
    {
        country: "argentina",
        year: 1991,
        ar_ym: 98,
        ar_yw: 98,
        ar_ty: 98
    },
    {
        country: "burkina faso",
        year: 2005,
        ar_ym: 40,
        ar_yw: 26,
        ar_ty: 33
    },

    {
        country: "eeuu",
        year: 1990,
        ar_ym: 97,
        ar_yw: 91,
        ar_ty: 94
    },

    {
        country: "bangladesh",
        year: 2013,
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
        year: 2018,
        ar_ym: 95,
        ar_yw: 94,
        ar_ty: 95
    },
    {
        country: "indonesia",
        year: 2020,
        ar_ym: 100,
        ar_yw: 100,
        ar_ty: 100
    },
    {
        country: "liberia",
        year: 2017,
        ar_ym: 65,
        ar_yw: 46,
        ar_ty: 55
    },
    {
        country: "mauritania",
        year: 2017,
        ar_ym: 71,
        ar_yw: 57,
        ar_ty: 64
    }

];
    
module.exports.register = (app) => {
    //Métodos GET:
    app.get(BASE_API_URL + "/alphabetization-stats/loadInitialData",(req, res)=>{
        if(alphabetization_stats.length==0){
            alphabetization_stats = [
                {
                    country: "argentina",
                    year: 1991,
                    ar_ym: 98,
                    ar_yw: 98,
                    ar_ty: 98
                },
                {
                    country: "burkina faso",
                    year: 2005,
                    ar_ym: 40,
                    ar_yw: 26,
                    ar_ty: 33
                },
            
                {
                    country: "eeuu",
                    year: 1990,
                    ar_ym: 97,
                    ar_yw: 91,
                    ar_ty: 94
                },
            
                {
                    country: "bangladesh",
                    year: 2013,
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
                    year: 2018,
                    ar_ym: 95,
                    ar_yw: 94,
                    ar_ty: 95
                },
                {
                    country: "indonesia",
                    year: 2020,
                    ar_ym: 100,
                    ar_yw: 100,
                    ar_ty: 100
                },
                {
                    country: "liberia",
                    year: 2017,
                    ar_ym: 65,
                    ar_yw: 46,
                    ar_ty: 55
                },
                {
                    country: "mauritania",
                    year: 2017,
                    ar_ym: 71,
                    ar_yw: 57,
                    ar_ty: 64
                }
            ];
        }
        res.sendStatus(200, "OK.")
    });
    
    app.get(BASE_API_URL+"/alphabetization-stats/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/19594199/UVyn2ypy")
    });

    app.get(BASE_API_URL + "/alphabetization-stats/:country", (req,res)=>{
        var countryName = req.params.country;
        filteredCountry = alphabetization_stats.filter((cont) =>{
        return (cont.country == countryName); 
        });
        if(filteredCountry == 0){
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredCountry, null,2));
        }
    });
    
    app.get(BASE_API_URL + "/alphabetization-stats/:country/:year", (req,res)=>{
        var countryName = req.params.country;
        var yearName = req.params.year;
        filteredYear = alphabetization_stats.filter((cont) =>{
        return (cont.country == countryName) && (cont.year == yearName);     
        });
    
        if(filteredYear == 0){
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredYear, null,2));
        }
    });

    app.get(BASE_API_URL + "/alphabetization-stats", (req,res)=>{
        res.send(JSON.stringify(alphabetization_stats, null,2));
    });

    //Métodos POST:
    app.post(BASE_API_URL + "/alphabetization-stats/:country", (req,res)=>{
        res.sendStatus(405, "Method not allowed");
    });
    app.post(BASE_API_URL + "/alphabetization-stats/:year", (req,res)=>{
        res.sendStatus(405, "Method not allowed");
    });

    function paramOK(req){
        return (req.body.country == null |
                 req.body.year == null | 
                 req.body.ar_ym == null | 
                 req.body.ar_yw == null | 
                 req.body.ar_ty == null);
    };

    app.post(BASE_API_URL+ "/alphabetization-stats",(req, res)=>{
        if(paramOK(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{ 
            var postAlphabetization = alphabetization_stats.filter((reg)=>{
            return (req.body.country == reg.country && req.body.year == reg.year)
        });
        if(postAlphabetization.length != 0){
            res.sendStatus(409,"CONFLICT");
        }else{
            alphabetization_stats.push(req.body);
            res.sendStatus(201,"CREATED");
        }
    }
    });

    //Método DELETE:
    app.delete(BASE_API_URL + "/alphabetization-stats", (req,res)=>{ 
        alphabetization_stats = [];
        res.sendStatus(200, "OK");
    });
    
    
    app.delete(BASE_API_URL + "/alphabetization-stats/:country", (req,res)=>{
        var countryName = req.params.country;
        alphabetization_stats.filter((cont) =>{
            return (cont.country == countryName);
        });
        res.sendStatus(200, "OK");
    });
    
    app.delete(BASE_API_URL + "/alphabetization-stats/:country/:year", (req,res)=>{
        var countryName = req.params.country;
        var yearName = req.params.year;
        alphabetization_stats.filter((cont) =>{
            return (cont.country == countryName) && (cont.year == yearName); 
        });
        res.sendStatus(200, "OK");
    });
    
    //Método PUT:
    app.put(BASE_API_URL + "/alphabetization-stats", (req,res)=>{
        res.sendStatus(405, "Method Not Allowed");
    });

    app.put(BASE_API_URL+"/alphabetization-stats/:country/:year",(req, res)=>{
        
        if(paramOK(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }else{
            var country = req.params.country;
            var year = req.params.year;
            var body = req.body;  
            var tl = alphabetization_stats.findIndex((reg) =>{
                return (reg.country == country && reg.year == year)
            });
            if(tl == null){
                res.sendStatus(404,"NOT FOUND");
            }else if(country != body.country || year != body.year){
                res.sendStatus(400,"BAD REQUEST");
            }else{
                var  update_Alphabetization = {...body};
                alphabetization_stats[tl] = update_Alphabetization;
            
                res.sendStatus(200,"UPDATED");
            }
        }
    });
};
