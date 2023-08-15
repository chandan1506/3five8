

//<-------importing controller---->
const { getAllBookings, addBooking } = require('../config/db');

//<--- finding time difference---->
const time_diff=(start_time,end_time)=>{
  const [start_hour1,start_min1]=start_time.split(":").map(Number)
  const [start_hour2,start_min2]=end_time.split(":").map(Number);

  let total_start_min1=start_hour1*60+start_min1;
  let total_start_min2=start_hour2*60+start_min2

  let total_diff_in_minutes=total_start_min2-total_start_min1

  if(total_diff_in_minutes<0){
    total_diff_in_minutes+=24*60
  }
 
  //<----Converting to hours---->
  let diff_in_hours = total_diff_in_minutes / 60;
  return diff_in_hours ;

 }

// <----creating new booking facility-->
const bookFacilities = (req, res) => {
  try {
    const { facility, date, start_time, end_time } = req.body;

    //checking already booked facility or not
    const bookingExisted = getAllBookings().find((item) => {
      return (
        item.facility === facility &&
        item.date === date &&
        ((start_time >= item.start_time && start_time < item.end_time) ||
          (end_time > item.start_time && end_time <= item.end_time) ||
          (start_time <= item.start_time && end_time >= item.end_time))
      );
    });

    // if booking existed 
    if (bookingExisted) {
      return res.status(400).json({ message: 'Booking Failed,Already Booked' });
    }

    let amount = 0;
    // finding amount for Clubhouse
    if (facility == 'Clubhouse') {
      if (start_time >= '10:00' && end_time <= '16:00') {
        amount += time_diff(start_time, end_time) * 100;
      } else if (start_time >= '16:00' && end_time <= '22:00') {
        amount += time_diff(start_time, end_time) * 500;
      }
    }

    //   finding amount for tennis court
    if (facility == 'Tennis Court') {
      amount += time_diff(start_time, end_time) * 50;
    }

    // creating new bookings
    const newBooking = {
      facility,
      date,
      start_time,
      end_time,
      amount,
    };

    // Add booking slots and details 
    const bookings = getAllBookings();
    const timeSlots = bookings[facility] || [];

    for (let i = 0; i < timeSlots.length; i++) {
      const slot_start_time = timeSlots[i].start_time;
      const slot_end_time = timeSlots[i].end_time;

      const isBooked =
        (start_time >= slot_start_time && start_time < slot_end_time) ||
        (end_time > slot_start_time && end_time <= slot_end_time) ||
        (start_time <= slot_start_time && end_time >= slot_end_time);

      if (isBooked) {
        return res.status(400).json({ message: 'Booking Failed, Slot Already Booked' });
      }
    }

    timeSlots.push({
      slot: `${start_time}-${end_time}`,
      bookingDetails: newBooking,
    });

    bookings[facility] = timeSlots;
    addBooking(newBooking);
    // console.log(timeSlots)
    // console.log(newBooking);
    return res.status(200).json({ message: 'Booked', amount });
  } catch (error) {
    return res.status(500).json({ message: 'Booking Failed' });
  }
};

// <----------exporting-------->
module.exports = { bookFacilities }

