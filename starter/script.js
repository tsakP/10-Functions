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
/* 
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
  console.log(this.planes);
}

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));
console.log(addVAT(23));

// Challenge

const addTAXrate = function(rate) {
  return function(value) {
    console.log(value + value * rate);
  }
}

const addVAT2 = addTAXrate(0.23);
addVAT2(100);

const addVAT2Arrow = rate => value => console.log(value + value * rate);
addVAT2Arrow(0.23)(23);

/* Coding Challenge #1

Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an
array with the number of replies for each option. This data is stored in the starter
'poll' object below.

Your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:
  1.1. Display a prompt window for the user to input the number of the
       selected option. The prompt should look like this:
        What is your favourite programming language?
          0: JavaScript
          1: Python
          2: Rust
          3: C++
          (Write option number)
  1.2. Based on the input number, update the 'answers' array property. For
       example, if the option is 3, increase the value at position 3 of the array by
       1. Make sure to check if the input is a number and if the number makes
       sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a
string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each
'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
object! So what should the this keyword look like in this situation? 

Test data for bonus:
§ Data 1: [5, 2, 3]
§ Data 2: [1, 5, 3, 9, 6, 1]
Hints: Use many of the tools you learned about in this and the last section �
*/

/* const poll = {
 question: "What is your favourite programming language?",
 options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
 // This generates [0, 0, 0, 0]. More in the next section!
 answers: new Array(4).fill(0),
 language: 0,
 registerNewAnswer() {
    // Get answer
    this.language = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));

    // Register answer with short circuiting
    typeof this.language === 'number' && this.language < this.answers.length && this.answers[this.language]++;
    this.displayResults();
    this.displayResults('string');
 },
 displayResults(type = 'array') {
    if(type === 'array') console.log(this.answers);
    if(type === 'string') console.log(`Poll results are ${this.answers.join(', ')}`);
 }
 };

const pollBtn = document.querySelector('.poll');
pollBtn.addEventListener('click', poll.registerNewAnswer.bind(poll));

const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1]

const displayResults = poll.displayResults;

displayResults.call({ answers: data1}, 'string');
displayResults.call({ answers: data2});  */


////////////////////////////////////////////////////////////////////////
// IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)

/* const runOnce = function() {
  console.log('This will never run again');
};
runOnce();

// IIFE
(function() {
  console.log('This will never run again');
})();

// IIFE arrow
(() => console.log('This will ALSO never run again'))(); */

////////////////////////////////////////////////////////////////////////
// CLOSURES

//* A function has access to the variable envirnment (VE) of the execution context in which it was created
//* Closure: Variable Environment (VE) attached to the function, exactly as it was at the time and place the function was created
//* Formal: A closure is the closed-over VE of the execution context in which a function was created, even after that execution context is gone
//* Less Formal: A closure gives a fuction access to all the variables of its parent function, even after that parent function has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughout time.
//* Even less formal: A closure makes sure that a function doesn't loose connection to variables that existed at the function's birth place;
//* Extremely unformal: A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were present in the environment where the function was created.

const secureBooking = function() {
  let passengerCount = 0;

  return function() {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  }
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);