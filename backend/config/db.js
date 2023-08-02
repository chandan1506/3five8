
let bookings = [];

// <-----to get bookings--->
const getAllBookings =  () =>{
    return bookings
} 

// <-----to add bookings--->
const addBooking = (booking) =>{
    bookings.push(booking)
} 

// <-----exporting--->
module.exports = { getAllBookings, addBooking };