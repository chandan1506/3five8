// <-----creating bookingRouter--->
const express = require("express")
const bookingRouter = express.Router()

// <-----importing bookFacilities--->
const { bookFacilities } = require("../controller/book.controller")

// <-----to book facility--->
bookingRouter.post("/booking", bookFacilities)


// <-----exporting bookingRouter--->
module.exports = { bookingRouter }