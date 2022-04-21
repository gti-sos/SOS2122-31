/*
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const BASE_API_URL = "/api/v1";

const bodyParser = require("body-parser");
app.use(bodyParser.json());



var alphabetization_stats = [
    {
        country: "argentina",
        year: 1991,
        ar_ym: 98,
        ar_yw: 98,
        ar_ty: 98
    } 

];

app.get(BASE_API_URL + "/alphabetization-stats", (req,res)=>{
    res.send(JSON.stringify(alphabetization_stats, null,2));
});

app.post(BASE_API_URL + "/alphabetization-stats", (req,res)=>{
    alphabetization_stats.push(req.body);
    res.sendStatus(201, "CREATED");
});

app.delete(BASE_API_URL + "/alphabetization-stats", (req,res)=>{ 
    alphabetization_stats = [];
    res.sendStatus(200, "OK");
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


app.listen(port, () =>{
    console.log(`server TRULY ready at the port ${port}`);
});
*/