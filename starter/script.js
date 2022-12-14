'use strict';

//////////////////////////////////////////////////////////////
// Default Parameters

/* const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES5 way
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 20, 233);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 300);

const flight = 'LH234';
const petros = {
  name: 'Petros Tsakonas',
  passport: 23498723498,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 23498723498) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, petros);
// console.log(flight);
// console.log(petros);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(petros);
// console.log(petros.passport);
checkIn(flight, petros);
 */
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
// Functions Accepting Callback Functions
/* 
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original sting: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('🖐');
};

document.body.addEventListener('click', high5);

['Petros', 'Koula', 'Mitsos'].forEach(high5);
// ****************************************************

// Functions Returning Functions

const greet = function(greeting) {
  return function(name) {
    console.log(`${greeting} ${name}`);
  }
}

const greeterHey = greet('Hey');
greeterHey('Petros');
greet('Hello')('Petros');

// Challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Yo')('Petran'); */
// *********************************************************

// The call and apply Methods

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} 
    flight ${this.iataCode}${flightNum}`);
    this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
  },
};

lufthansa.book(239, 'Petros Tsakonas');
lufthansa.book(635, 'Diana Ross');
console.log(lufthansa);

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: []
}

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');

// Call method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: []
};

book.call(swiss, 583, 'Mary Cooper');
// console.log(swiss);

// Apply method

const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

//Bind method

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookSW = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);

bookEW23('Petros Tsakonas');
bookEW23('Lara Kota');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
  console.log(this);
  
  this.planes++

}