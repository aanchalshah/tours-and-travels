const tours = [
    { destination: 'Delhi', duration: '3 days', originalPrice: 300, discount: 10, imageUrl: 'images/delhi.png' },
    { destination: 'Goa', duration: '5 days', originalPrice: 500, discount: 15, imageUrl: 'images/goa.png' },
    { destination: 'Jaipur', duration: '4 days', originalPrice: 400, discount: 12, imageUrl: 'images/jaipur.png' },
    { destination: 'Mumbai', duration: '7 days', originalPrice: 700, discount: 20, imageUrl: 'images/mumbai.png' },
];

let selectedMembers = 1; // default to 1 member

document.addEventListener('DOMContentLoaded', () => {
    const fromDateInput = document.getElementById('fromDate');
    const toDateInput = document.getElementById('toDate');
    const destinationInput = document.getElementById('destination');
    const membersInput = document.getElementById('members');
    const searchButton = document.querySelector('button[type="button"]');

    searchButton.addEventListener('click', () => {
        const selectedDestination = destinationInput.value;
        const fromDate = new Date(fromDateInput.value);
        const toDate = new Date(toDateInput.value);
        selectedMembers = parseInt(membersInput.value, 10);

        const duration = (toDate - fromDate) / (1000 * 60 * 60 * 24) + 1;

        tours.forEach(tour => {
            if (tour.destination === selectedDestination) {
                tour.duration = `${duration} days`;
            } else {
                tour.duration = 'Not applicable';
            }
        });

        const filteredTours = tours.filter(tour => {
            return tour.destination === selectedDestination;
        });

        displayTours(filteredTours, selectedMembers);
    });
});

function displayTours(tours, members) {
    const tourPackagesDiv = document.querySelector('.tour-packages');
    tourPackagesDiv.innerHTML = '';

    tours.forEach(tour => {
        const discountedPrice = tour.originalPrice - (tour.originalPrice * tour.discount / 100);
        const totalPrice = discountedPrice * members;

        const tourDiv = document.createElement('div');
        tourDiv.className = 'tour';
        tourDiv.innerHTML = `
            <img src="${tour.imageUrl}" alt="${tour.destination}">
            <h3>${tour.destination}</h3>
            <p>Duration: ${tour.duration}</p>
            <p>Original Price: $${tour.originalPrice}</p>
            <p>Discounted Price: $${discountedPrice}</p>
            <p>Total Price for ${members} members: $${totalPrice}</p>
            <button onclick="showBookingDetails('${tour.destination}', '${tour.duration}', ${tour.originalPrice}, ${discountedPrice}, ${members}, ${totalPrice})">Proceed</button>
        `;
        tourPackagesDiv.appendChild(tourDiv);
    });
}

function showBookingDetails(destination, duration, originalPrice, discountedPrice, members, totalPrice) {
    const bookingDetailsDiv = document.querySelector('.booking-details');
    bookingDetailsDiv.innerHTML = `
        <h2>Booking Details</h2>
        <p>Booking Date: ${new Date().toLocaleDateString()}</p>
        <p>Tour Starts on: ${document.getElementById('fromDate').value}</p>
        <p>Tour Ends on: ${document.getElementById('toDate').value}</p>
        <p>Destination: ${destination}</p>
        <p>Duration: ${duration}</p>
        <p>Original Price: $${originalPrice}</p>
        <p>Discounted Price: $${discountedPrice}</p>
        <p>Total Price for ${members} members: $${totalPrice}</p>
        
        <h2>Person Details</h2>
        <div id="personDetailsForm"></div>
        
        <button onclick="showPaymentOptions('${destination}', '${duration}', ${originalPrice}, ${discountedPrice}, ${members}, ${totalPrice})">Proceed to Payment</button>
    `;

    const personDetailsFormDiv = document.getElementById('personDetailsForm');
    personDetailsFormDiv.innerHTML = ''; // Clear previous form details

    for (let i = 0; i < members; i++) {
        const personForm = `
            <table>
                <tr>
                    <td>Name:</td>
                    <td><input type="text" placeholder="Name" class="personName" required></td>
                </tr>
                <tr>
                    <td>Phone Number:</td>
                    <td><input type="tel" placeholder="Phone Number" class="personPhone" required></td>
                </tr>
                <tr>
                    <td>Age:</td>
                    <td><input type="number" placeholder="Age" class="personAge" required></td>
                </tr>
            </table>
        `;
        personDetailsFormDiv.innerHTML += personForm;
    }

    document.querySelector('.booking-form').style.display = 'none';
    document.querySelector('.tour-packages').style.display = 'none';
    document.querySelector('.booking-details').style.display = 'block';
}

// ... (rest of the code remains unchanged)

// ... (rest of the code remains unchanged)

function bookTour(destination, duration, originalPrice, discountedPrice, members, totalPrice) {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;

    if (selectedPayment && name && phone && age) {
        alert(`Booking successful! Payment method: ${selectedPayment.value}`);
    } else {
        alert('Please fill in all the details.');
    }
}
function showPaymentOptions(destination, duration, originalPrice, discountedPrice, members, totalPrice) {
    const paymentOptionsDiv = document.querySelector('.payment-options');
    paymentOptionsDiv.innerHTML = `
        <h2>Payment Options</h2>
        <label><input type="radio" name="payment" value="credit-card"> Credit Card</label><br>
        <div class="credit-card-details" style="display:none;">
            <input type="text" placeholder="Card Number" id="cardNumber">
            <input type="text" placeholder="Card Holder Name" id="cardHolderName">
            <input type="text" placeholder="Expiry Date (MM/YY)" id="expiryDate">
            <input type="text" placeholder="CVV" id="cvv">
        </div>
        
        <label><input type="radio" name="payment" value="debit-card"> Debit Card</label><br>
        <div class="debit-card-details" style="display:none;">
            <input type="text" placeholder="Card Number" id="debitCardNumber">
            <input type="text" placeholder="Card Holder Name" id="debitCardHolderName">
            <input type="text" placeholder="Expiry Date (MM/YY)" id="debitExpiryDate">
            <input type="text" placeholder="CVV" id="debitCvv">
        </div>
        
        <label><input type="radio" name="payment" value="UPI"> UPI</label><br>
        <div class="upi-details" style="display:none;">
            <input type="text" placeholder="UPI ID" id="upiId">
        </div>

        <button onclick="processPayment('${destination}', '${duration}', ${originalPrice}, ${discountedPrice}, ${members}, ${totalPrice})">Proceed to Payment</button>
    `;

    document.querySelector('.booking-details').style.display = 'none';
    document.querySelector('.payment-options').style.display = 'block';
    // CSS for the payment options
const paymentOptionsStyles = `
.payment-methods {
    margin-bottom: 10px;
}

.payment-details {
    display: none;
}

.payment-details label,
.payment-details input {
    margin-bottom: 10px;
}

.card-details,
.upi-details {
    display: none;
}

input[type="text"] {
    width: 30%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid;
}

button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
`;

// Inject the styles into the document
const styleElement = document.createElement('style');
styleElement.innerHTML = paymentOptionsStyles;
document.head.appendChild(styleElement);

    // Show/hide payment details based on selected payment method
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelector('.credit-card-details').style.display = 'none';
            document.querySelector('.debit-card-details').style.display = 'none';
            document.querySelector('.upi-details').style.display = 'none';

            if (this.value === 'credit-card') {
                document.querySelector('.credit-card-details').style.display = 'block';
            } else if (this.value === 'debit-card') {
                document.querySelector('.debit-card-details').style.display = 'block';
            } else if (this.value === 'UPI') {
                document.querySelector('.upi-details').style.display = 'block';
            }
        });
    });
}
function processPayment(destination, duration, originalPrice, discountedPrice, members, totalPrice) {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;

    if (selectedPayment === 'UPI') {
        const upiId = document.getElementById('upiId').value;
        // Assume UPI payment processing logic here
        alert(`UPI Payment successful! Thank you for booking your tour to ${destination}!`);
    } else {
        const cardNumber = selectedPayment === 'credit-card' ? document.getElementById('cardNumber').value : document.getElementById('debitCardNumber').value;
        const cardHolderName = selectedPayment === 'credit-card' ? document.getElementById('cardHolderName').value : document.getElementById('debitCardHolderName').value;
        const expiryDate = selectedPayment === 'credit-card' ? document.getElementById('expiryDate').value : document.getElementById('debitExpiryDate').value;
        const cvv = selectedPayment === 'credit-card' ? document.getElementById('cvv').value : document.getElementById('debitCvv').value;

        // Assume card payment processing logic here
        alert(`Card Payment successful! Thank you for booking your tour to ${destination}!`);
    }

    // Clear payment options after successful payment
    document.querySelector('.payment-options').style.display = 'none';
    displayBookingConfirmation(destination, duration, originalPrice, discountedPrice, members, totalPrice);
}
function displayBookingConfirmation(destination, duration, originalPrice, discountedPrice, members, totalPrice) {
    const bookingDetailsDiv = document.querySelector('.booking-details');
    bookingDetailsDiv.innerHTML = `
        <h2>Booking Successful!</h2>
        <p>Thank you for booking your tour to ${destination}!</p>
        <p>Duration: ${duration}</p>
        <p>Total Price: $${totalPrice}</p>
        <p>Happy Touring!</p>
        <button onclick="redirectToHomePage()">Go to Homepage</button>
    `;

    document.querySelector('.booking-form').style.display = 'none';
    document.querySelector('.tour-packages').style.display = 'none';
    document.querySelector('.booking-details').style.display = 'block';
}

function redirectToHomePage() {
    window.location.href = 'index.html';
}





