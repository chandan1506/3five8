// <------------express---------->
const express = require("express")
const app = express()
app.use(express.json())

// <------------dotenv---------->
require("dotenv").config()
const Port = process.env.port

// <------------cors---------->
const cors = require("cors")
app.use(cors())


// <------------router---------->
const { bookingRouter } = require("./router/bookingRouter")
app.use("/",bookingRouter)

// <------------base API---------->
app.get("/",(req,res)=>{
    res.json("welcome to base API")
})

// <------------establishing connection---------->
const { connection } = require("./config/db")
app.listen(Port,async ()=>{
    try {
        await connection
        console.log("server is connected on db")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`DB is running on ${Port}`)
})