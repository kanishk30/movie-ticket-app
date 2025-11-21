const express = require("express")
const dotEnv = require("dotenv")
const cors = require("cors")

const dbConfig = require("./dbConfig.js")

dotEnv.config()
const app = express()
dbConfig.connectDb()

const userRoutes = require('./routes/user.route.js')

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use('/api/auth', userRoutes)

app.listen(8001, () => {
    console.log("Server started..")
})