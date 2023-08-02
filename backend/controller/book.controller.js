// <-----------importing db.js----------->
const { getAllBookings, addBooking } = require("../config/db");

// <-----------to book facility----------->
const bookFacilities = (req, res) => {
  try {
    const { facility, date, startTime, endTime, amount } = req.body;
    // checking booking is already done or not
    const bookingExisted = getAllBookings().find((booking) => {
      return (
        booking.facility === facility &&
        booking.date === date &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
          (endTime > booking.startTime && endTime <= booking.endTime) ||
          (startTime <= booking.startTime && endTime >= booking.endTime))
      );
    });

    // if booking is already existing
    if (bookingExisted) {
      res.status(400).json({ message: "Booking Failed, Already Booked" });
    } else {
      // if booking is not existing
      const book = { facility, date, startTime, endTime, amount };
      addBooking(book);
      res.status(200).json({ message: "Booked", amount });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Booking Failed" });
  }
};

// <---------exporting--------->
module.exports = { bookFacilities };
