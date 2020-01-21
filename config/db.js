const mongo = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const dbConnection = async () =>{
    try{
       await mongo.connect(db,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
       });
        console.log("mongoDB connected");
    }catch(err){
            console.log(err.message);
            process.exit(1);
    }
}

module.exports = dbConnection;