const container = document.querySelector('.container');
const allSeats = document.querySelectorAll('.row .seat');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const bookingBtn = document.querySelector('.booking-btn');
const lionKingRoom = document.querySelector('.lionking-room');
const toyStoryRoom = document.querySelector('.toystory-room');


populateUI();

let ticketPrice = +movieSelect.value;

// Functions
const setMovieData = (movieIndex) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
}

const updateSelectedCountAndTotal = () => {
    //Selected Seats
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //Occupied Seats
    const occupiedSeats = document.querySelectorAll('.row .seat.occupied');
    const occupiedSeatsIndex = [...occupiedSeats].map(seat => [...allSeats].indexOf(seat));
    localStorage.setItem('occupiedSeats', JSON.stringify(occupiedSeatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats'));

    if (selectedSeats) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    if (occupiedSeats) {
        allSeats.forEach((seat, index) => {
            if (occupiedSeats.indexOf(index) > -1) {
                seat.className = ' seat occupied';
            }
        });

    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex) {
        // When we change the index of the selected movie, the ticket price changes automatically.
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Event Listeners 
movieSelect.addEventListener('change', function (e) {
    if (this.value == 12) {
        lionKingRoom.style.display = 'block';
        toyStoryRoom.style.display = 'none';
        updateSelectedCountAndTotal();

    } else if (this.value == 8) {
        lionKingRoom.style.display = 'none';
        toyStoryRoom.style.display = 'block';
        updateSelectedCountAndTotal();
    }
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex);

});

container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCountAndTotal();
    }
});


bookingBtn.addEventListener('click', () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    if (selectedSeats.length > 0) {
        if (confirm(`Do you confirm the purchase of ${count.innerText} seat(s) with a total of $${total.innerText} to see ${movieSelect.options[movieSelect.selectedIndex].text}?`)) {
            selectedSeats.forEach(seat => seat.className = 'seat occupied');
            updateSelectedCountAndTotal();
        } else {
            return;
        }
    } else {
        alert('You have not selected any seats yet');
    }


});

// Initial count and total
updateSelectedCountAndTotal();