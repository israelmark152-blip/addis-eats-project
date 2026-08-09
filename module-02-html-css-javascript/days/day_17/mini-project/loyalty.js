'use strict';

// Factory creating a loyalty card module using closures and HOF rules
function createLoyalty(earnRule = (etb) => Math.floor(etb / 10)) {
  let points = 0; // Private balance variable

  return {
    // Add points calculated by the earn function
    earn(etb) {
      points += earnRule(etb);
    },
    // Subtract points, refusing to go below 0
    redeem(p) {
      points = Math.max(0, points - p);
    },
    // Getter function returning current balance
    balance() {
      return points;
    }
  };
}

// --- DEMO & TESTING ---

console.log('--- Standard Card Demo ---');
const standardCard = createLoyalty(); // Default rule: 1 point per 10 ETB
standardCard.earn(250);               // +25 points
console.log('Balance after earn 250 ETB:', standardCard.balance()); // 25

standardCard.redeem(10);              // -10 points
console.log('Balance after redeem 10:', standardCard.balance());    // 15

standardCard.redeem(50);              // Refuses to go below 0
console.log('Balance after over-redeem:', standardCard.balance());  // 0


console.log('\n--- Holiday Double-Points Card Demo ---');
// Swapping in a custom higher-order earn rule (double points)
const holidayRule = (etb) => Math.floor(etb / 10) * 2;
const holidayCard = createLoyalty(holidayRule);

holidayCard.earn(250);                // +50 points
console.log('Holiday card balance:', holidayCard.balance());        // 50
console.log('Standard card balance remains independent:', standardCard.balance()); // 0