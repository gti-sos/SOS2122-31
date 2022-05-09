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


