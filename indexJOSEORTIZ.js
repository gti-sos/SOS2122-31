const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const BASE_API_URL = "/api/v1";

const bodyParser = require("body-parser");
app.use(bodyParser.json());

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

app.get(BASE_API_URL + "/proportion-stats", (req,res)=>{ //get de todos los recursos
    res.send(JSON.stringify(proportion_stats, null,2));
});

app.post(BASE_API_URL + "/proportion-stats", (req,res)=>{ //post de un recurso
    proportion_stats.push(req.body);
    res.sendStatus(201, "CREATED");
});

app.delete(BASE_API_URL + "/proportion-stats", (req,res)=>{  //delete de todos los recursos
    proportion_stats = [];
    res.sendStatus(200, "OK");
});

app.get(BASE_API_URL + "/proportion-stats/:country", (req,res)=>{ //get de un recurso por country
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

app.get(BASE_API_URL + "/proportion-stats/:country/:year", (req,res)=>{ //get de un recurso por country y year
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

app.delete(BASE_API_URL + "/proportion-stats/:country", (req,res)=>{ //borrar todos los recursos
    var countryName = req.params.country;
    proportion_stats.filter((cont) =>{
        return (cont.country == countryName); 
    });
    res.sendStatus(200, "OK");
});

app.delete(BASE_API_URL + "/proportion-stats/:country/:year", (req,res)=>{ //borrar todos los recursos
    var countryName = req.params.country;
    var yearName = req.params.year;
    proportion_stats.filter((cont) =>{
        return (cont.country == countryName) && (cont.year == yearName); 
    });
    res.sendStatus(200, "OK");
});

app.listen(port, () =>{ //escuchar en el puerto
    console.log(`server TRULY ready at the port ${port}`);
});


