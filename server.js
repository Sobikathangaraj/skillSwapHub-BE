const express = require("express");
const server = express();
var mongoose = require("mongoose");
var port = 8080;
server.use(express.json());

// cors
const cors = require("cors");
server.use(cors());

var userRouter = require("./router/user.router");
server.use("/user",userRouter);


// using database!!....  mongodb -> Atlas

  mongoose.connect("mongodb+srv://sobika0505:Sobika04052005@sobika.ufmnkvg.mongodb.net/skill")
 .then(()=> console.log("MongoDb get Connected..."))
 .catch(()=> console.log("MongoDb is not get Connected.."));


// Server running
server.listen(port, () => {
  console.log(`Server connected and running on port ${port}`);
});


//("mongodb+srv://sobika0505:Sobika04052005@sobika.ufmnkvg.mongodb.net/UserData")