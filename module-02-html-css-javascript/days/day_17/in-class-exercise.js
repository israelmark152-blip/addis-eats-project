'use strict';

// 1. Calculate subtotal using rest parameters and reduce
const subtotal = (...prices) => prices.reduce((sum, p) => sum + p, 0);

// 2. Factory function for discount
const discountBy = (rate) => (n) => n * (1 - rate);

// 3. Small pure helpers
const withVat = (n) => n * 1.15;
const toETB = (n) => `${n.toFixed(2)} ETB`;

// 4. Closure-based receipt generator
function makeReceiptMaker() {
  let orderNo = 0; // Private persistent order counter
  const memberOff = discountBy(0.10); // Pre-configured 10% member discount

  return function (...items) {
    orderNo++;
    const gross = subtotal(...items);
    const net = withVat(memberOff(gross));
    return `#${orderNo}: ${toETB(net)}`;
  };
}

// Demo usage
const receipt = makeReceiptMaker();

console.log(receipt(220, 180, 120)); // Doro Wat + Tibs + Shiro -> #1: 538.20 ETB
console.log(receipt(140, 60));       // Firfir + Buna           -> #2: 207.00 ETB