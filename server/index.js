const express = require("express")
const dotEnv = require("dotenv")

const dbConfig = require("./dbConfig.js")

dotEnv.config()
const app = express()
dbConfig.connectDb()

app.use("/", (req, res) => {
    res.send("Hello from server")
})

app.listen(8001, () => {
    console.log("Server started..")
})