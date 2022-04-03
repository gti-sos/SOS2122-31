const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

const registration_stats_V1 = require("./src/backend/v1/registration-statsV1");
const Datastore = require('nedb');
db_regitration_stats = new Datastore();

app.use(bodyParser.json());

registration_stats_V1.register(app,db_regitration_stats);


//José Ortiz Roldán
const proportion_statsV1 = require("./src/backend/v1/proportion-statsV1");
proportion_statsV1.register(app);

app.use("/", express.static("public"));

app.get("/cool", (req,res)=>{
    console.log("Requested /cool route");
    res.send("<html><body><h1>"+ cool() + "</h1></body></html>");
});


app.listen(port, () =>{
    console.log(`server TRULY ready at the port ${port}`);
});