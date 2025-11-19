const express = require("express")
const dotEnv = require("dotenv")

const dbConfig = require("./dbConfig.js")

dotEnv.config()
const app = express()
dbConfig.connectDb()

const userRoutes = require('./routes/user.route.js')

app.use(express.json())
app.use('/api/auth', userRoutes)

app.listen(8001, () => {
    console.log("Server started..")
})