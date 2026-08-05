'use strict';

// 1. Raw inputs (simulating values received from input/form)
const billRaw = "480";
const partySize = 4;
const paymentMethod = "telebirr"; // Options: 'telebirr', 'cbebirr', 'awash'

// 2. Convert bill to a number
const bill = Number(billRaw);

// 3. Tiered tip calculation: 10% if bill > 300 ETB, else 5%
const tipRate = bill > 300 ? 0.10 : 0.05;
const tip = bill * tipRate;

// 4. Determine service fee based on payment method using switch
let serviceFeeRate = 0;

switch (paymentMethod) {
    case 'telebirr':
        serviceFeeRate = 0.005; // 0.5%
        break;
    case 'cbebirr':
    case 'awash':
        serviceFeeRate = 0.01;  // 1.0%
        break;
    default:
        serviceFeeRate = 0.02;  // 2.0%
}

const serviceFee = bill * serviceFeeRate;

// 5. Calculate total and per person cost
const total = bill + tip + serviceFee;
const perPerson = total / partySize;

// 6. Print formatted summary using template literals
console.log(`--- Habesha Eatery Bill Summary ---`);
console.log(`Base Bill: ${bill} ETB`);
console.log(`Tip (${tipRate * 100}%): ${tip} ETB`);
console.log(`Service Fee (${paymentMethod}): ${serviceFee} ETB`);
console.log(`Total: ${total} ETB`);
console.log(`Amount per person (${partySize} guests): ${perPerson} ETB each`);