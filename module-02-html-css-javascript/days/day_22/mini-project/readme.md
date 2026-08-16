# Birr Watch - Mini Project

A single-page currency tracking application built with pure vanilla JavaScript, HTML5, and CSS3, utilizing a single-source-of-truth State architecture.

## Requirements Implemented
* **State-Driven Rendering:** Every screen modification is triggered through updates to the centralized `state` object followed by execution of `render()`.
* **API Fetching & Handling:** Fetches live ETB currency conversion rates from `https://open.er-api.com/v6/latest/ETB` with active loading status and clear network error messages.
* **Input Validation:** Blocks conversion for empty, non-numeric, zero, or negative inputs.
* **Watchlist & Event Delegation:** Supports adding target currencies without duplicates, renders empty-state messages when the list is empty, and utilizes event delegation to process deletions.
* **LocalStorage Persistence:** Restores saved watchlist items and the last selected currency upon page refresh.

## API Used
* **Open ER API**: `https://open.er-api.com/v6/latest/ETB`

## How to Run
1. Navigate to `day_22/mini-project/` directory.
2. Open `index.html` in any web browser.