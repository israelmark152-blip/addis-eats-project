'use strict';

// -------------------------------------------------------------
// Exercise 1: Default parameters & implicit return arrow function
// -------------------------------------------------------------
// Regular function with default parameter
function vat(amount, rate = 0.15) {
  return amount * rate;
}

// Arrow function equivalent with implicit return
const vatArrow = (amount, rate = 0.15) => amount * rate;

console.log('Ex 1 (vat):', vat(100)); // 15
console.log('Ex 1 (vatArrow):', vatArrow(100)); // 15


// -------------------------------------------------------------
// Exercise 2: Closure counter with private state
// -------------------------------------------------------------
function makeCounter() {
  let count = 0; // Private variable trapped inside the closure
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log('Ex 2:', counter()); // 1
console.log('Ex 2:', counter()); // 2

/*
 EXPLANATION FOR COMMENTS:
 `count` stays private because it is scoped within `makeCounter()`.
 The returned inner function forms a closure over `count`, allowing it to read 
 and mutate `count` while preventing outside scripts from directly modifying `count`.
*/


// -------------------------------------------------------------
// Exercise 3: Factory function for discounts
// -------------------------------------------------------------
function discountBy(rate) {
  return (price) => price * (1 - rate);
}

const memberPrice = discountBy(0.10); // 10% discount
const salePrice = discountBy(0.30);   // 30% discount

console.log('Ex 3 Member Price (1000 ETB):', memberPrice(1000)); // 900
console.log('Ex 3 Sale Price (1000 ETB):', salePrice(1000));     // 700


// -------------------------------------------------------------
// Exercise 4: Higher-Order Function (applyToAll)
// -------------------------------------------------------------
function applyToAll(list, fn) {
  const result = [];
  for (const item of list) {
    result.push(fn(item));
  }
  return result;
}

const prices = [100, 200, 300];
const pricesWithVat = applyToAll(prices, (p) => p * 1.15);
console.log('Ex 4 Prices with VAT:', pricesWithVat); // [115, 230, 345]


// -------------------------------------------------------------
// Exercise 5: Array callback using forEach
// -------------------------------------------------------------
const cities = ['Addis Ababa', 'Hawassa', 'Dire Dawa', 'Bahir Dar'];

cities.forEach((city, index) => {
  console.log(`Ex 5: ${index + 1}. ${city}`);
});