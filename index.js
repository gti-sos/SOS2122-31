const cool = require("cool-ascii-faces"); //cool es una función 
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;


app.use("/", express.static("public"));


app.get("/cool", (req,res)=>{
    console.log("Requested /cool route");
    res.send("<html><body><h1>"+ cool() + "</h1></body></html>");
});

app.listen(port, () =>{
    console.log(`server TRULY ready at the port ${port}`);
});