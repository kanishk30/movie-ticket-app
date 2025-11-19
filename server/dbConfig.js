const mongoose = require("mongoose")

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to DB")
    } catch (err) {
         console.log("Error in DB connection", err)
    }
} 

module.exports = {connectDb}