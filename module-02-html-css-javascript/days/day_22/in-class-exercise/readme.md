# Birr Watch

A client-side JavaScript application for tracking real-time exchange rates against the Ethiopian Birr (ETB).

## Features
- **Live Rates Fetching:** Fetches live currency exchange rates relative to ETB using the Open ER API (`https://open.er-api.com/v6/latest/ETB`).
- **Currency Conversion:** Converts ETB amounts to any selected target currency.
- **Watchlist Management:** Allows adding target currencies to a watchlist without duplicate entries and deleting items using event delegation.
- **Persistence:** Stores watchlist selections and user preferences in `localStorage` across browser reloads.

## How to Run
1. Open `index.html` in your web browser.
2. Enter an ETB amount, pick a currency, and click **Convert**.
3. Use **+ Add to Watchlist** to save quick rate views.