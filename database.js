const  {MongoClient} = require("mongodb");

const url = "mongodb+srv://HSAM:WuMDfNqPImObsQ3R@cluster0.0x0cv.mongodb.net/database?retryWrites=true&w=majority";

const Client = new MongoClient(url);

async function dbConnect(){

  let result = await Client.connect();
  let db = result.db("database");
  return db.collection("users");

}


module.exports = dbConnect;

// var collection = db.collection("users").insertOne(obj,(err,res)=>{
//    if(err){
//       throw err;
//    }else{
//       console.log("data inserted succesfully!");
//    }
// });