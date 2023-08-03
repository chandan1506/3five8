const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const facility = e.target.facility.value;
  const date = e.target.date.value;
  const startTime = e.target.startTime.value;
  const endTime = e.target.endTime.value;
  const amount = parseInt(e.target.amount.value);

  const res = await fetch('https://threefive8.onrender.com/booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ facility, date, startTime, endTime, amount }),
  });

  const data = await res.json();

  if (res.ok) {
    await  swal(
        `Booking successful. Amount: Rs. ${data.amount}`,
        "",
        "success"
      );
  } else {
    await swal(data.message,"","error");
  }
});

