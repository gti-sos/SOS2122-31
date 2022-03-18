const cool = require("cool-ascii-faces"); //cool es una función 
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const BASE_API_URL = "/api/v1";

const bodyParser = require("body-parser");
app.use(bodyParser.json());



var registration_stats = [
    {
        country: "germany",
        year: 2019,
        primarylevel: 103
    } 

];

app.get(BASE_API_URL + "/registration-stats", (req,res)=>{
    res.send(JSON.stringify(registration_stats, null,2));
});

app.post(BASE_API_URL + "/registration-stats", (req,res)=>{
    registration_stats.push(req.body);
    res.sendStatus(201, "CREATED");
});

app.delete(BASE_API_URL + "/registration-stats", (req,res)=>{ 
    registration_stats = [];
    res.sendStatus(200, "OK");
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



app.delete(BASE_API_URL + "/registration-stats/:country", (req,res)=>{ //borrar todos los recursos
    var countryName = req.params.country;
    registration_stats.filter((cont) =>{
        return (cont.country == countryName); 
    });
    res.sendStatus(200, "OK");
});

app.delete(BASE_API_URL + "/registration-stats/:country/:year", (req,res)=>{ //borrar todos los recursos
    var countryName = req.params.country;
    var yearName = req.params.year;
    registration_stats.filter((cont) =>{
        return (cont.country == countryName) && (cont.year == yearName); 
    });
    res.sendStatus(200, "OK");
});


app.listen(port, () =>{
    console.log(`server TRULY ready at the port ${port}`);
});