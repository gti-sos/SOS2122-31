const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const BASE_API_URL = "/api/v1";

const bodyParser = require("body-parser");
app.use(bodyParser.json());

var proportion_stats = [
    
       //2015

   {
    country : "Albania",
    year : 2015,
    male : 29.82, 
    female : 31.3,
    total : 22.3

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


