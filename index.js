const cool = require("cool-ascii-faces"); //cool es una función 
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

var path = require('path');

const BASE_API_URL = "/api/v1";
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const registration_statsV1 =  require("./src/backend/v1/registration-statsV1");
registration_statsV1.register(app);

//Daniel Vega Vera:
const alphabetization_statsV1 =  require("./src/backend/v1/alphabetization-statsV1");
alphabetization_statsV1.register(app);

app.use("/", express.static("public"));

app.get("/cool", (req,res)=>{
    console.log("Requested /cool route");
    res.send("<html><body><h1>"+ cool() + "</h1></body></html>");
});


app.listen(port, () =>{
    console.log(`server TRULY ready at the port ${port}`);
});