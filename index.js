const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

const registration_stats_V2 = require("./src/backend/v2/registration-statsV2");
const registration_stats_V1 = require("./src/backend/v1/registration-statsV1");
const Datastore = require('nedb');
const path = require('path');
const request = require('request');
var datafile = path.join(__dirname, 'registration-stats.db');
db_regitration_stats = new Datastore({ filename: datafile, autoload: true });

app.use(cors());
app.use(bodyParser.json());

//Proxys
var paths = '/remoteAPI';
var apiServerHost = 'https://sos2122-27.herokuapp.com/api/v2/public-expenditure-stats';

app.use(paths, function (req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

var paths2 = '/remoteApiCancer';
var apiServerHost2 = 'https://sos2122-24.herokuapp.com/api/v2/cancerdeaths-stats';

app.use(paths2, function (req, res) {
  var url = apiServerHost2 + req.url;
  req.pipe(request(url)).pipe(res);
});


registration_stats_V2.register(app, db_regitration_stats);

registration_stats_V1.register(app, db_regitration_stats);


//José Ortiz Roldán
const proportion_statsV1 = require("./src/backend/v1/proportion-statsV1");
const Datastore1 = require('nedb');
const path1 = require('path');
var datafile2 = path1.join(__dirname, 'proportion-stats.db');

app.use(bodyParser.json());

db_proportion_stats = new Datastore1({ filename: datafile2, autoload: true });
proportion_statsV1.register(app, db_proportion_stats);


//Daniel Vega Vera V1:
const alphabetization_stats_V1 = require("./src/backend/v1/alphabetization-statsV1");
var datafile = path.join(__dirname, 'alphabetization-statsV1.db');
db_alphabetization_stats = new Datastore({ filename: datafile, autoload: true });
alphabetization_stats_V1.register(app, db_alphabetization_stats);
//Daniel Vega Vera V2:
const alphabetization_stats_V2 = require("./src/backend/v2/alphabetization-statsV2");
var datafile = path.join(__dirname, 'alphabetization-statsV2.db');
db_alphabetization_stats = new Datastore({ filename: datafile, autoload: true });
alphabetization_stats_V2.register(app, db_alphabetization_stats);

app.use("/", express.static("public"));

app.get("/cool", (req, res) => {
  console.log("Requested /cool route");
  res.send("<html><body><h1>" + cool() + "</h1></body></html>");
});


app.listen(port, () => {
  console.log(`server TRULY ready at the port ${port}!`);
});