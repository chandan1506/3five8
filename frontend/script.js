const Form = document.getElementById("Form");
let Facility = document.getElementById("facility");
let Date=document.getElementById("date")
let startTime = document.getElementById('startTime');
let endTime = document.getElementById('endTime');
let Amount=document.getElementById("amount");

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

 
//  <----updating amount--->
const addAmount=()=>{
   let facility = Facility.value;
   let start_time = startTime.value;
   let end_time = endTime.value

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
     Amount.value = amount.toString()

}

// Listening changes in the start time and end time inputs
startTime.addEventListener('change', addAmount);
endTime.addEventListener('change', addAmount);

// listening submit event
Form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const facility=Facility.value;
  const date=Date.value;
  const start_time=startTime.value;
  const end_time=endTime.value;


  const res = await fetch('http://localhost:3000/booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      facility,
      date,
      start_time,
      end_time
    }),
  });

  const bookingData = await res.json();
  Amount.value = bookingData.amount

  if (res.ok) {
    await  swal(
        `Booking successful. Amount: Rs. ${bookingData.amount}`,
        "",
        "success"
      );
  } else {
    await swal(bookingData.message,"","error");
  }
});

