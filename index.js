const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

const registration_stats_V1 = require("./src/backend/v1/registration-statsV1");
const Datastore = require('nedb');
const path = require('path');
var datafile = path.join(__dirname, 'registration-stats.db');
db_regitration_stats = new Datastore({filename: datafile, autoload:true});

app.use(bodyParser.json());

registration_stats_V1.register(app,db_regitration_stats);


//José Ortiz Roldán
const proportion_statsV1 = require("./src/backend/v1/proportion-statsV1");
proportion_statsV1.register(app);

//Daniel Vega Vera:
const alphabetization_stats_V1 = require("./src/backend/v1/alphabetization-statsV1");
var datafile = path.join(__dirname, 'alphabetization-stats.db');
db_alphabetization_stats = new Datastore({filename: datafile, autoload:true});
alphabetization_stats_V1.register(app,db_alphabetization_stats);

app.use("/", express.static("public"));

app.get("/cool", (req,res)=>{
    console.log("Requested /cool route");
    res.send("<html><body><h1>"+ cool() + "</h1></body></html>");
});


app.listen(port, () =>{
    console.log(`server TRULY ready at the port ${port}`);
});