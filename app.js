const express = require("express");
const bodyparser = require("body-parser");

const routes = require("./routes");

const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use("/api/v3/app",routes);
// app.use("/",routes);
// app.use("/delete",routes);

app.listen("8001",()=>{
   console.log("Server is running on 8001");
});


// async function  getData(){
//   let res = await Client.connect();
//   let db = res.db("EventsDB");
//   let collection = db.collection("users");
//   let response = await collection.find({}).toArray();
//   console.log(response);
// }