# Mini-Project: Country Facts Page

A single-page web application built with vanilla JavaScript that fetches live country details from the REST Countries API and dynamically renders them into the DOM.

## Features

* **Asynchronous API Requests**: Uses `async/await` and the Fetch API to retrieve live data from `https://restcountries.com/v3.1/name/{country}`.
* **Loading & Error Handling**: Displays explicit loading indicators, checks `res.ok`, handles missing countries ("Country not found"), and catches network connection errors gracefully.
* **Dynamic DOM Manipulation**: Uses `document.createElement()` and `appendChild()` to build the UI elements for capital, population, region, currencies, and national flags.
* **Data Formatting**: Automatically formats population numbers with commas (`toLocaleString()`) and extracts active currency names.
* **Default Load & Search**: Automatically displays facts for Ethiopia on initial page load and allows searching for any country.

## Project Structure

```text
mini-project/
├── index.html       # Application markup and search form
├── styles.css       # Layout and element styling
├── app.js           # Async fetch logic, error handling, and DOM rendering
└── README.md        # Project documentation