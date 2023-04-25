const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
    to: 'user@example.com', // Replace with the user's email address
    from: 'noreply@example.com', // Replace with your email address
    subject: 'Reservation Confirmation',
    text: 'Thank you for making a reservation with us!',
    html: '<p>Thank you for making a reservation with us!</p>',
  };
  
  sgMail.send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });

    // Define date range for calendar
const startDate = new Date(); // today
const endDate = new Date();
endDate.setDate(endDate.getDate() + 30); // 30 days from today

// Get reservation data from server
const reservations = getReservationData(startDate, endDate);

// Define room types
const roomTypes = ['Deluxe Room', 'Executive Room', 'Junior Suite', 'Presidential Suite'];

// Initialize calendar
const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
  plugins: ['dayGrid', 'timeGrid'],
  defaultView: 'dayGridMonth',
  header: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: [], // will be populated with reservation data
  eventRender: function(info) {
    // Customize display of reservation event
    const roomType = info.event.extendedProps.roomType;
    const guests = info.event.extendedProps.guests;
    info.el.querySelector('.fc-title').innerHTML = `${roomType} (${guests} guests)`;
  }
});

// Populate calendar with reservation data
calendar.renderEvents(reservations, true);

// Function to retrieve reservation data from server
function getReservationData(start, end) {
  // Send AJAX request to server to retrieve reservation data
  const request = new XMLHttpRequest();
  request.open('GET', `getReservations.php?start=${start.toISOString()}&end=${end.toISOString()}`, false);
  request.send(null);

  if (request.status === 200) {
    // Parse response data and return as events array
    const reservations = JSON.parse(request.responseText);
    const events = reservations.map(function(reservation) {
      return {
        id: reservation.id,
        title: 'Reserved',
        start: new Date(reservation.arrival_date),
        end: new Date(reservation.departure_date),
        extendedProps: {
          roomType: reservation.room_type,
          guests: reservation.num_guests
        }
      };
    });
    return events;
  }
}

// Function to update calendar with new reservation
function addReservation(reservation) {
  const event = {
    id: reservation.id,
    title: 'Reserved',
    start: new Date(reservation.arrival_date),
    end: new Date(reservation.departure_date),
    extendedProps: {
      roomType: reservation.room_type,
      guests: reservation.num_guests
    }
  };
  calendar.addEvent(event);
}

// Function to remove reservation from calendar
function removeReservation(id) {
  const event = calendar.getEventById(id);
  event.remove();
}
const checkinBtn = document.getElementById("checkin-btn");
const checkoutBtn = document.getElementById("checkout-btn");
const checkinForm = document.getElementById("checkin-form");
const checkoutForm = document.getElementById("checkout-form");

checkinBtn.addEventListener("click", () => {
  checkinForm.classList.add("show");
  checkoutForm.classList.remove("show");
});

checkoutBtn.addEventListener("click", () => {
  checkoutForm.classList.add("show");
  checkinForm.classList.remove("show");
});
// Here, you can add code to process the check-in and check-out forms, update the reservation data in the database, and send confirmation emails to the user.

// define a guest object to store guest information
let guests = {
    "guest1": {
      "name": "John Doe",
      "loyaltyPoints": 20
    },
    "guest2": {
      "name": "Jane Smith",
      "loyaltyPoints": 10
    }
  };
  
  // function to retrieve guest's loyalty points from database
  function getGuestLoyaltyPoints(guestID) {
    return guests[guestID]["loyaltyPoints"];
  }
  
  // function to update guest's loyalty points in database
  function updateGuestLoyaltyPoints(guestID, newPoints) {
    guests[guestID]["loyaltyPoints"] = newPoints;
  }

  // calculate loyalty points based on amount spent
function calculateLoyaltyPoints(amountSpent) {
    let points = 0;
  
    // determine points based on amount spent
    if (amountSpent < 100) {
      points = 5;
    } else if (amountSpent < 500) {
      points = 10;
    } else if (amountSpent < 1000) {
      points = 20;
    } else {
      points = 50;
    }
  
    return points;
  }
  
  // award loyalty points to guest based on amount spent
  function awardLoyaltyPoints(guestID, amountSpent) {
    // retrieve guest's loyalty points from database
    let guestLoyaltyPoints = getGuestLoyaltyPoints(guestID);
  
    // calculate additional loyalty points to award
    let additionalPoints = calculateLoyaltyPoints(amountSpent);
  
    // update guest's loyalty points in database
    updateGuestLoyaltyPoints(guestID, guestLoyaltyPoints + additionalPoints);
  }