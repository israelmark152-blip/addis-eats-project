# TeleBirr Loyalty Points Module

## How State Privacy Works
The `points` variable is declared using `let` inside the `createLoyalty` factory function. 
Because JavaScript uses lexical scope, `points` is only directly accessible inside `createLoyalty`. 

The returned object methods (`earn`, `redeem`, `balance`) form **closures** over `points`. They maintain a live link to `points` even after `createLoyalty()` finishes executing. Outside code cannot modify `card.points` directly; it can only interact with state through the exposed functions.